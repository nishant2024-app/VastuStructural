import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface Lead {
    id: string;
    name: string;
    phone: string;
    city: string;
    plotSize: string;
    direction: string;
    rooms: string;
    status: "pending" | "contacted" | "completed";
    source: "ai_generated" | "ai_failed" | "direct";
    createdAt: string;
    notes?: string;
}

const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");

async function ensureDataDir() {
    const dataDir = path.join(process.cwd(), "data");
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir, { recursive: true });
    }
}

async function getLeads(): Promise<Lead[]> {
    try {
        const data = await fs.readFile(LEADS_FILE, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function saveLeads(leads: Lead[]) {
    await ensureDataDir();
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, phone, city, plotSize, direction, rooms, aiStatus, notes } = body;

        if (!name || !phone) {
            return NextResponse.json(
                { error: "Name and phone are required" },
                { status: 400 }
            );
        }

        const lead: Lead = {
            id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name,
            phone,
            city: city || "",
            plotSize: plotSize || "",
            direction: direction || "",
            rooms: rooms || "",
            status: "pending",
            source: aiStatus === "failed" ? "ai_failed" : aiStatus === "success" ? "ai_generated" : "direct",
            createdAt: new Date().toISOString(),
            notes: notes || ""
        };

        const leads = await getLeads();
        leads.unshift(lead); // Add to beginning for newest first
        await saveLeads(leads);

        // Log for admin visibility
        console.log(`📋 NEW LEAD: ${name} | ${phone} | ${city} | ${plotSize} | ${direction} | ${rooms} | Source: ${lead.source}`);

        return NextResponse.json({
            success: true,
            leadId: lead.id,
            message: "Lead captured successfully"
        });
    } catch (error) {
        console.error("Lead capture error:", error);
        return NextResponse.json(
            { error: "Failed to capture lead" },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status");
        const source = searchParams.get("source");
        const query = searchParams.get("q")?.toLowerCase();
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");

        let leads = await getLeads();

        // Search by name, phone, or city
        if (query) {
            leads = leads.filter(l =>
                l.name.toLowerCase().includes(query) ||
                l.phone.toLowerCase().includes(query) ||
                l.city.toLowerCase().includes(query)
            );
        }

        // Filter by status if provided
        if (status) {
            leads = leads.filter(l => l.status === status);
        }

        // Filter by source if provided
        if (source) {
            leads = leads.filter(l => l.source === source);
        }

        // All leads for export (skip pagination)
        if (searchParams.get("all") === "true") {
            return NextResponse.json({ leads });
        }

        // Stats calculation
        const allLeadsData = await getLeads();
        const stats = {
            total: allLeadsData.length,
            pending: allLeadsData.filter(l => l.status === "pending").length,
            aiGenerated: allLeadsData.filter(l => l.source === "ai_generated").length,
            manualRequired: allLeadsData.filter(l => l.source === "ai_failed" && l.status === "pending").length
        };

        // Pagination
        const totalItems = leads.length;
        const totalPages = Math.ceil(totalItems / limit);
        const startIndex = (page - 1) * limit;
        const paginatedLeads = leads.slice(startIndex, startIndex + limit);

        return NextResponse.json({
            leads: paginatedLeads,
            stats,
            pagination: {
                total: totalItems,
                totalPages,
                currentPage: page,
                limit
            }
        });
    } catch (error) {
        console.error("Get leads error:", error);
        return NextResponse.json(
            { error: "Failed to get leads" },
            { status: 500 }
        );
    }
}

// Update lead (for admin)
export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { leadId, status, notes, name, phone, city, plotSize, direction, rooms } = body;

        if (!leadId) {
            return NextResponse.json({ error: "Lead ID required" }, { status: 400 });
        }

        const leads = await getLeads();
        const leadIndex = leads.findIndex(l => l.id === leadId);

        if (leadIndex === -1) {
            return NextResponse.json({ error: "Lead not found" }, { status: 404 });
        }

        // Full update support
        if (status) leads[leadIndex].status = status;
        if (notes !== undefined) leads[leadIndex].notes = notes;
        if (name) leads[leadIndex].name = name;
        if (phone) leads[leadIndex].phone = phone;
        if (city) leads[leadIndex].city = city;
        if (plotSize) leads[leadIndex].plotSize = plotSize;
        if (direction) leads[leadIndex].direction = direction;
        if (rooms) leads[leadIndex].rooms = rooms;

        await saveLeads(leads);

        return NextResponse.json({ success: true, lead: leads[leadIndex] });
    } catch (error) {
        console.error("Update lead error:", error);
        return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
    }
}

// Delete lead (for admin)
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const leadId = searchParams.get("id");

        if (!leadId) {
            return NextResponse.json({ error: "Lead ID required" }, { status: 400 });
        }

        const leads = await getLeads();
        const filteredLeads = leads.filter(l => l.id !== leadId);

        if (leads.length === filteredLeads.length) {
            return NextResponse.json({ error: "Lead not found" }, { status: 404 });
        }

        await saveLeads(filteredLeads);

        return NextResponse.json({ success: true, message: "Lead deleted successfully" });
    } catch (error) {
        console.error("Delete lead error:", error);
        return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
    }
}
