/**
 * Clusters Flow - Mock API
 * Simulates backend responses with artificial delays.
 */

export interface Cluster {
    id: string;
    name: string;
    status: 'Idle' | 'Running' | 'Needs Attention';
    lastActivity: string;
    tags: string[];
    description: string;
}

export interface Job {
    id: string;
    clusterId: string;
    status: 'queued' | 'running' | 'done' | 'failed';
    timestamp: string;
    logs: string[];
}

export interface Template {
    id: string;
    name: string;
    category: string;
    previewUrl: string;
    description: string;
}

const MOCK_CLUSTERS: Cluster[] = [
    {
        id: '1',
        name: 'Marketing Engine',
        status: 'Running',
        lastActivity: '2 mins ago',
        tags: ['Marketing', 'Ads'],
        description: 'Autonomous marketing campaign generator and optimizer.'
    },
    {
        id: '2',
        name: 'Support Agent V2',
        status: 'Idle',
        lastActivity: '1 hour ago',
        tags: ['Customer Support', 'Bilingual'],
        description: 'Customer support agent with multilingual capabilities.'
    },
    {
        id: '3',
        name: 'SEO Optimizer',
        status: 'Needs Attention',
        lastActivity: '10 mins ago',
        tags: ['SEO', 'Optimization'],
        description: 'Automated SEO auditing and correction tool.'
    }
];

const MOCK_TEMPLATES: Template[] = [
    {
        id: 't1',
        name: 'Lead Gen Flow',
        category: 'Sales',
        previewUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
        description: 'Complete flow for capturing and qualifying leads.'
    },
    {
        id: 't2',
        name: 'Content Factory',
        category: 'Content',
        previewUrl: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&auto=format&fit=crop&q=60',
        description: 'High-speed content production pipeline.'
    }
];

export const mockApi = {
    getClusters: async (): Promise<Cluster[]> => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return MOCK_CLUSTERS;
    },

    getCluster: async (id: string): Promise<Cluster | undefined> => {
        await new Promise(resolve => setTimeout(resolve, 800));
        return MOCK_CLUSTERS.find(c => c.id === id);
    },

    getJobs: async (clusterId: string): Promise<Job[]> => {
        await new Promise(resolve => setTimeout(resolve, 1200));
        return [
            {
                id: 'job_1',
                clusterId,
                status: 'done',
                timestamp: '2024-02-14 10:30',
                logs: ['Initializing...', 'Researching niche...', 'Generating copy...', 'SEO optimization done.', 'Ready.']
            },
            {
                id: 'job_2',
                clusterId,
                status: 'running',
                timestamp: '2024-02-14 12:45',
                logs: ['Processing layout...', 'Waiting for assets...']
            }
        ];
    },

    getTemplates: async (): Promise<Template[]> => {
        await new Promise(resolve => setTimeout(resolve, 600));
        return MOCK_TEMPLATES;
    }
};
