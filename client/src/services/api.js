import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock Saree Catalog
export const MOCK_SAREES = [
  {
    id: 'saree-1',
    name: 'Royal Crimson Banarasi',
    material: 'Pure Silk',
    color: 'Red & Gold Zari',
    description: 'A traditional masterpiece adorned with intricate golden zari work, ideal for weddings and grand festive celebrations.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600',
    category: 'Silk',
    price: '₹14,999'
  },
  {
    id: 'saree-2',
    name: 'Emerald Peacock Kanjeevaram',
    material: 'Kanchipuram Silk',
    color: 'Emerald Green',
    description: 'Lustrous emerald green silk saree showcasing traditional peacock motifs and a contrast mustard gold border.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600',
    category: 'Silk',
    price: '₹18,500'
  },
  {
    id: 'saree-3',
    name: 'Pastel Cherry Organza',
    material: 'Premium Organza',
    color: 'Blush Pink',
    description: 'Ultra-lightweight blush pink organza saree featuring hand-painted floral motifs and a delicate silver border.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600',
    category: 'Organza',
    price: '₹6,499'
  },
  {
    id: 'saree-4',
    name: 'Midnight Sequin Georgette',
    material: 'Faux Georgette',
    color: 'Midnight Black',
    description: 'A glamorous party wear saree fully embroidered with shimmering black sequins, draped to perfection.',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=600',
    category: 'Georgette',
    price: '₹8,299'
  },
  {
    id: 'saree-5',
    name: 'Indigo Mughal Chanderi',
    material: 'Chanderi Cotton-Silk',
    color: 'Indigo Blue',
    description: 'Crafted in Chanderi, this saree blends raw cotton texture with silk sheen, decorated with silver hand-block prints.',
    image: 'https://images.unsplash.com/photo-1583391265517-35bbdad01209?auto=format&fit=crop&q=80&w=600',
    category: 'Cotton',
    price: '₹5,199'
  },
  {
    id: 'saree-6',
    name: 'Golden Amber Kora Silk',
    material: 'Kora Organza',
    color: 'Amber Gold',
    description: 'Translucent and breezy amber gold kora silk saree featuring traditional copper borders and geometrical pallu details.',
    image: 'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?auto=format&fit=crop&q=80&w=600',
    category: 'Silk',
    price: '₹9,800'
  }
];

// Helper to manage mock history in LocalStorage
const getLocalHistory = () => {
  const data = localStorage.getItem('saree_tryon_history');
  return data ? JSON.parse(data) : [];
};

const saveLocalHistory = (history) => {
  localStorage.setItem('saree_tryon_history', JSON.stringify(history));
};

// API Services
export const sareeService = {
  getSarees: async () => {
    try {
      const response = await api.get('/api/sarees');
      return response.data;
    } catch (error) {
      console.warn('API connection failed. Falling back to Mock Saree data.', error);
      return MOCK_SAREES;
    }
  },

  generateTryOn: async (userImage, sareeId) => {
    try {
      const response = await api.post('/api/tryon', { image: userImage, sareeId });
      return response.data;
    } catch (error) {
      console.warn('API connection failed. Simulating AI Saree Try-On locally.', error);
      
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      // Find selected saree
      const saree = MOCK_SAREES.find(s => s.id === sareeId) || MOCK_SAREES[0];
      
      // Simulated AI Try-On Image: We use Unsplash or an overlay.
      // To provide a stunning visual, we use a beautifully matched model saree image.
      const resultImage = saree.image; 

      // Create history entry
      const newHistoryItem = {
        id: `history-${Date.now()}`,
        userImage: userImage,
        sareeId: sareeId,
        sareeName: saree.name,
        sareeImage: saree.image,
        resultImage: resultImage,
        createdAt: new Date().toISOString(),
      };

      const history = getLocalHistory();
      saveLocalHistory([newHistoryItem, ...history]);

      return newHistoryItem;
    }
  },

  getHistory: async () => {
    try {
      const response = await api.get('/api/history');
      return response.data;
    } catch (error) {
      console.warn('API connection failed. Returning local history.', error);
      return getLocalHistory();
    }
  },

  deleteHistory: async (id) => {
    try {
      await api.delete(`/api/history/${id}`);
      return true;
    } catch (error) {
      console.warn('API connection failed. Deleting history item locally.', error);
      const history = getLocalHistory();
      const updated = history.filter(item => item.id !== id);
      saveLocalHistory(updated);
      return true;
    }
  }
};

export default api;
