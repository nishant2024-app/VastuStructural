import { Project, Client, Contractor, ProjectStatus, User } from "./types";

// In-memory cache
let projectsCache: Project[] | null = null;
let clientsCache: Client[] | null = null;
let contractorsCache: Contractor[] | null = null;

const STORAGE_KEYS = {
    PROJECTS: "vastu_mock_projects",
    CLIENTS: "vastu_mock_clients",
    CONTRACTORS: "vastu_mock_contractors",
};

// INITIAL DATA
const initialProjects: Project[] = [
    {
        id: "1",
        orderId: "VSABC123",
        customerName: "Rajesh Kumar",
        customerPhone: "+91 98765 43210",
        customerEmail: "rajesh@example.com",
        planType: "standard",
        planName: "Standard Plan",
        amount: 9999,
        status: "design_in_progress",
        assignedContractorId: "1",
        createdAt: new Date("2026-02-10"),
        updatedAt: new Date("2026-02-10"),
        plotDetails: {
            plotSize: "1200 sq. ft.",
            plotDimensions: "30 x 40 ft",
            direction: "East Facing",
            floors: 2,
            requirements: "3 BHK with Vastu compliant design, separate pooja room, car parking",
        },
        updates: [],
        deliverables: [],
    },
    {
        id: "2",
        orderId: "VSXYZ456",
        customerName: "Priya Sharma",
        customerPhone: "+91 87654 32109",
        customerEmail: "priya@example.com",
        planType: "premium",
        planName: "Premium Plan",
        amount: 24999,
        status: "contractor_assigned",
        assignedContractorId: "2",
        createdAt: new Date("2026-02-11"),
        updatedAt: new Date("2026-02-11"),
        plotDetails: {
            plotSize: "2400 sq. ft.",
            plotDimensions: "40 x 60 ft",
            direction: "North Facing",
            floors: 3,
            requirements: "Luxurious villa, swimming pool, home theater",
        },
        updates: [],
        deliverables: [],
    },
    {
        id: "3",
        orderId: "VSPQR789",
        customerName: "Amit Patil",
        customerPhone: "+91 76543 21098",
        customerEmail: "amit@example.com",
        planType: "basic",
        planName: "Basic Plan",
        amount: 2999,
        status: "order_placed",
        assignedContractorId: null,
        createdAt: new Date("2026-02-13"),
        updatedAt: new Date("2026-02-13"),
        plotDetails: {
            plotSize: "800 sq. ft.",
            plotDimensions: "20 x 40 ft",
            direction: "West Facing",
            floors: 1,
            requirements: "Simple 1 BHK",
        },
        updates: [],
        deliverables: [],
    }
];

const initialClientsByProjects: Client[] = initialProjects.map((p, idx) => ({
    id: String(idx + 1),
    name: p.customerName,
    phone: p.customerPhone,
    email: p.customerEmail || "client@example.com",
    projectCount: 1,
    totalSpent: p.amount,
    createdAt: p.createdAt,
}));

const initialContractors: Contractor[] = [
    {
        id: "1",
        name: "Rajendra Patil",
        company: "Patil Construction",
        phone: "+91 90679 69756",
        district: "Washim",
        status: "approved",
        projectCount: 5,
        referralCode: "VSRP12",
        createdAt: new Date("2026-01-10"),
    },
    {
        id: "2",
        name: "Suresh Deshmukh",
        company: "Deshmukh Builders",
        phone: "+91 87654 12345",
        district: "Washim",
        status: "approved",
        projectCount: 8,
        referralCode: "VSSD34",
        createdAt: new Date("2025-12-01"),
    },
    {
        id: "3",
        name: "Sunil Ganorkar",
        company: "Vastu Shila",
        phone: "+91 76543 54321",
        district: "Akola",
        status: "pending",
        projectCount: 0,
        referralCode: "VSSG56",
        createdAt: new Date("2026-02-13"),
    }
];

export const MockDB = {
    getProjects: (): Project[] => {
        if (typeof window === "undefined") return initialProjects;
        if (projectsCache) return projectsCache;

        const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
        if (stored) {
            projectsCache = JSON.parse(stored).map((p: any) => ({
                ...p,
                createdAt: new Date(p.createdAt),
                updatedAt: new Date(p.updatedAt),
                updates: p.updates.map((u: any) => ({ ...u, createdAt: new Date(u.createdAt) })),
                deliverables: p.deliverables.map((d: any) => ({ ...d, uploadedAt: new Date(d.uploadedAt) })),
            }));
            return projectsCache!;
        }

        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialProjects));
        projectsCache = initialProjects;
        return initialProjects;
    },

    getProjectById: (id: string): Project | null => {
        const projects = MockDB.getProjects();
        return projects.find(p => p.id === id) || null;
    },

    updateProject: (id: string, updates: Partial<Project>) => {
        const projects = MockDB.getProjects();
        const index = projects.findIndex(p => p.id === id);
        if (index === -1) return;

        projects[index] = { ...projects[index], ...updates, updatedAt: new Date() };
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
        projectsCache = projects;
    },

    getClients: (): Client[] => {
        if (typeof window === "undefined") return initialClientsByProjects;
        if (clientsCache) return clientsCache;

        const stored = localStorage.getItem(STORAGE_KEYS.CLIENTS);
        if (stored) {
            clientsCache = JSON.parse(stored).map((c: any) => ({
                ...c,
                createdAt: new Date(c.createdAt)
            }));
            return clientsCache!;
        }

        localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(initialClientsByProjects));
        clientsCache = initialClientsByProjects;
        return initialClientsByProjects;
    },

    getContractors: (): Contractor[] => {
        if (typeof window === "undefined") return initialContractors;
        if (contractorsCache) return contractorsCache;

        const stored = localStorage.getItem(STORAGE_KEYS.CONTRACTORS);
        if (stored) {
            contractorsCache = JSON.parse(stored).map((c: any) => ({
                ...c,
                createdAt: new Date(c.createdAt)
            }));
            return contractorsCache!;
        }

        localStorage.setItem(STORAGE_KEYS.CONTRACTORS, JSON.stringify(initialContractors));
        contractorsCache = initialContractors;
        return initialContractors;
    },

    updateContractor: (id: string, updates: Partial<Contractor>) => {
        const contractors = MockDB.getContractors();
        const index = contractors.findIndex(c => c.id === id);
        if (index === -1) return;

        contractors[index] = { ...contractors[index], ...updates };
        localStorage.setItem(STORAGE_KEYS.CONTRACTORS, JSON.stringify(contractors));
        contractorsCache = contractors;
    },

    deleteContractor: (id: string) => {
        const contractors = MockDB.getContractors();
        const filtered = contractors.filter(c => c.id !== id);
        localStorage.setItem(STORAGE_KEYS.CONTRACTORS, JSON.stringify(filtered));
        contractorsCache = filtered;
    }
};
