import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, Search, Filter, Plus } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import DonationCard from '@/components/DonationCard';
import { useWallet } from '@solana/wallet-adapter-react';
import BN from 'bn.js';
import { PublicKey } from '@solana/web3.js';
import { useCampaigns } from '@/components/campagins/campaigns-data-access';

type AnchorMilestoneData = {
  id: BN;
  amount: BN;
  order: number;
  totalVotes: BN;
  totalAgreedVotes: BN;
  totalDisagreedVotes: BN;
  status: { ongoing?: {}; completed?: {}; cancelled?: {}; };
}

type AnchorProgramAccount = {
  account: {
      id: BN;
      sponsor: PublicKey;
      totalAmount: BN;
      title: string;
      description: string;
      milestones: AnchorMilestoneData[];
      beneficiary: PublicKey;
  }
}

type Status = {
  ongoing?: Record<string, never>;
  completed?: Record<string, never>;
  cancelled?: Record<string, never>;
}

type Milestone = {
  id: BN;
  amount: BN;
  order: number;
  totalVotes: BN;
  totalAgreedVotes: BN;
  totalDisagreedVotes: BN;
  isCompleted: boolean;
  status: Status;
}

export type Campaign = {
  id: BN;
  title: string;
  description: string;
  sponsor: string;
  totalAmount: BN;
  milestones: Milestone[];
  beneficiary: string;
}

// Mock data for demonstration
const MOCK_CAMPAIGNS = [
  {
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop",
    title: "Save the Rainforest",
    description: "Help preserve the Amazon rainforest and its biodiversity",
    raised: 45000,
    goal: 100000,
    supporters: 320,
    category: 'Temp',
    campaignUrl: "#",
  },
  // ... other mock campaigns
];

const ITEMS_PER_PAGE = 6;

// Form data type
type CampaignFormData = {
  title: string;
  description: string;
  totalAmount: string;
  beneficiary: string;
}

const CampaignPage = () => {
  const [id, setId] = useState(new BN(1));
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState<CampaignFormData>({
    title: '',
    description: '',
    totalAmount: '',
    beneficiary: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<CampaignFormData>>({});

  const wallet = useWallet();
  const publicKey = wallet.publicKey;

  const { getCampaigns, createCampaign } = useCampaigns({
    beneficiary: new PublicKey("4rAvATEgWMVGjrxiF1AiY6qn4SCCEg92EgURySVfxcP2"), 
    id: id, 
    sponsor: publicKey as PublicKey
  });

  // if (!publicKey) {
  //   return <div>Connect your wallet to view campaigns</div>;
  // }

  const { data: campaigns, isLoading, error } = getCampaigns; 

  // Handle initial loading and error states
  if (isLoading) {
    return <div>Loading campaigns...</div>;
  }

  if (error) {
    return <div>Error loading campaigns: {error.message}</div>; 
  }

  const campaignList: Campaign[] = (campaigns as AnchorProgramAccount[] || [])
    .map(programAccount => ({
        id: programAccount.account.id,
        totalAmount: programAccount.account.totalAmount,
        title: programAccount.account.title,
        description: programAccount.account.description,
        milestones: programAccount.account.milestones.map(milestone => ({
            id: milestone.id,
            amount: milestone.amount,
            order: milestone.order,
            totalVotes: milestone.totalVotes,
            totalAgreedVotes: milestone.totalAgreedVotes,
            totalDisagreedVotes: milestone.totalDisagreedVotes,
            isCompleted: !!milestone.status.completed, 
            status: milestone.status as unknown as Status, 
        })),
        beneficiary: programAccount.account.beneficiary.toBase58(),
        sponsor: programAccount.account.sponsor.toBase58(), 
    }));

  const handleCreateCampaign = () => {
    // Validate form
    const errors: Partial<CampaignFormData> = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    if (!formData.totalAmount || isNaN(Number(formData.totalAmount)) || Number(formData.totalAmount) <= 0) {
      errors.totalAmount = 'Valid total amount is required';
    }
    if (!formData.beneficiary.trim()) {
      errors.beneficiary = 'Beneficiary public key is required';
    } else {
      try {
        new PublicKey(formData.beneficiary);
      } catch {
        errors.beneficiary = 'Invalid Solana public key';
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Clear errors
    setFormErrors({});

    // Here you would typically call your createCampaign mutation
    // For now, we'll just log the data and close the dialog
    console.log('Creating campaign with data:', formData);
    
    // If you have a mutation function, you would call it here:
    createCampaign.mutate({ title: formData.title, description: formData.description, totalAmount: new BN(Number(formData.totalAmount)), beneficiary: new PublicKey(formData.beneficiary) });

    // Reset form and close dialog
    setFormData({
      title: '',
      description: '',
      totalAmount: '',
      beneficiary: ''
    });
    setIsCreateDialogOpen(false);

    // If using the actual mutation, you might want to handle success state differently
    // if (createCampaign.isSuccess) {
    //     setId(id.add(new BN(1)));
    // }
  };

  const handleInputChange = (field: keyof CampaignFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const currentCampaigns = campaignList;

  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Campaigns</h1>
            <p className="text-gray-600 mt-2">
              Discover and support amazing projects making a difference
            </p>
          </div>
          <Button 
            className="bg-lime-600 hover:bg-lime-700 text-white"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </div>

        {/* Campaigns Grid */}
        <Card className="mb-8 border-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Featured Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCampaigns.map((campaign, index) => (

                <DonationCard
                  key={index}
                  image={MOCK_CAMPAIGNS[index % MOCK_CAMPAIGNS.length].image}
                  title={campaign.title}
                  description={campaign.description}
                  raised={campaign.milestones.filter(milestone => milestone.status.completed).reduce((acc, milestone) => acc + milestone.amount.toNumber(), 0)}
                  goal={campaign.totalAmount.toNumber()}
                  sponsor={campaign.sponsor}
                  campaignId={campaign.id}
                />
              ))}
            </div>

            {/* No Results Message */}
            {currentCampaigns.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No campaigns found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Create Campaign Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Create New Campaign
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Fill in the details below to create a new fundraising campaign.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Campaign Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter campaign title"
                  className={formErrors.title ? "border-red-500" : ""}
                />
                {formErrors.title && (
                  <p className="text-red-500 text-sm">{formErrors.title}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Description *
                </Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter campaign description"
                  className={formErrors.description ? "border-red-500" : ""}
                />
                {formErrors.description && (
                  <p className="text-red-500 text-sm">{formErrors.description}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="totalAmount" className="text-sm font-medium text-gray-700">
                  Total Amount (in lamports) *
                </Label>
                <Input
                  id="totalAmount"
                  type="number"
                  value={formData.totalAmount}
                  onChange={(e) => handleInputChange('totalAmount', e.target.value)}
                  placeholder="Enter total amount"
                  className={formErrors.totalAmount ? "border-red-500" : ""}
                />
                {formErrors.totalAmount && (
                  <p className="text-red-500 text-sm">{formErrors.totalAmount}</p>
                )}
                <p className="text-xs text-gray-500">
                  1 SOL = 1,000,000,000 lamports
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="beneficiary" className="text-sm font-medium text-gray-700">
                  Beneficiary Public Key *
                </Label>
                <Input
                  id="beneficiary"
                  value={formData.beneficiary}
                  onChange={(e) => handleInputChange('beneficiary', e.target.value)}
                  placeholder="Enter beneficiary Solana public key"
                  className={formErrors.beneficiary ? "border-red-500" : ""}
                />
                {formErrors.beneficiary && (
                  <p className="text-red-500 text-sm">{formErrors.beneficiary}</p>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateDialogOpen(false);
                  setFormErrors({});
                }}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateCampaign}
                className="bg-lime-600 hover:bg-lime-700 text-white"
                disabled={createCampaign?.isPending} // Use your actual mutation pending state
              >
                {createCampaign?.isPending ? "Creating..." : "Create Campaign"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CampaignPage;