import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Clock, XCircle, TrendingUp } from 'lucide-react';

interface DaanfiProject {
  amount: string;
  status: 'completed' | 'pending' | 'cancelled';
  createdAt: string;
  totalMilestones: string;
  completedMilestones: string;
}

export default function DaanfiForm() {
  const [formData, setFormData] = useState<DaanfiProject>({
    amount: '',
    status: 'pending',
    createdAt: new Date().toISOString().split('T')[0],
    totalMilestones: '',
    completedMilestones: '0'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleInputChange = (field: keyof DaanfiProject, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const progress = formData.totalMilestones && formData.completedMilestones
    ? (parseInt(formData.completedMilestones) / parseInt(formData.totalMilestones)) * 100
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-green-50 to-emerald-100 flex items-center justify-center p-3 sm:p-6 lg:p-8">
      <Card className="w-full max-w-4xl shadow-2xl border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-lime-500 via-lime-600 to-green-600 text-white p-6 sm:p-8 -m-px">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold">Daanfi Project</CardTitle>
          </div>
          <CardDescription className="text-lime-50 text-sm sm:text-base">
            Create and manage your crowdfunding project details
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-4 sm:p-6 lg:p-8">
          {submitted && (
            <Alert className="mb-6 border-green-300 bg-gradient-to-r from-green-50 to-lime-50 animate-in fade-in slide-in-from-top-2 duration-300">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <AlertDescription className="text-green-800 font-medium">
                Project details saved successfully!
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-5 sm:space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm sm:text-base font-semibold text-gray-700 flex items-center gap-2">
                <span className="text-lime-600">💰</span> Amount
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter project amount"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                className="w-full h-11 sm:h-12 text-base border-gray-300 focus:border-lime-500 focus:ring-lime-500 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm sm:text-base font-semibold text-gray-700 flex items-center gap-2">
                  <span className="text-lime-600">📊</span> Status
                </Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger className="w-full h-11 sm:h-12 border-gray-300 focus:border-lime-500 focus:ring-lime-500">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-600" />
                        <span>Pending</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="completed">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Completed</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="cancelled">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span>Cancelled</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="createdAt" className="text-sm sm:text-base font-semibold text-gray-700 flex items-center gap-2">
                  <span className="text-lime-600">📅</span> Created At
                </Label>
                <Input
                  id="createdAt"
                  type="date"
                  value={formData.createdAt}
                  onChange={(e) => handleInputChange('createdAt', e.target.value)}
                  className="w-full h-11 sm:h-12 border-gray-300 focus:border-lime-500 focus:ring-lime-500 transition-all"
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-lime-50 to-green-50 p-4 sm:p-6 rounded-xl border-2 border-lime-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-lime-600">🎯</span> Milestone Tracking
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="totalMilestones" className="text-sm font-medium text-gray-700">
                    Total Milestones
                  </Label>
                  <Input
                    id="totalMilestones"
                    type="number"
                    placeholder="e.g., 10, 20"
                    value={formData.totalMilestones}
                    onChange={(e) => handleInputChange('totalMilestones', e.target.value)}
                    className="w-full h-11 border-lime-300 focus:border-lime-500 focus:ring-lime-500"
                    min="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="completedMilestones" className="text-sm font-medium text-gray-700">
                    Completed Milestones
                  </Label>
                  <Input
                    id="completedMilestones"
                    type="number"
                    placeholder="0"
                    value={formData.completedMilestones}
                    onChange={(e) => handleInputChange('completedMilestones', e.target.value)}
                    className="w-full h-11 border-lime-300 focus:border-lime-500 focus:ring-lime-500"
                    min="0"
                    max={formData.totalMilestones || undefined}
                  />
                </div>
              </div>

              {formData.totalMilestones && formData.completedMilestones && (
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-xl sm:text-2xl font-bold text-lime-600">{progress.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 overflow-hidden shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-lime-500 via-lime-600 to-green-600 h-full rounded-full transition-all duration-500 ease-out shadow-lg"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-xs sm:text-sm text-gray-600">
                    <span>{formData.completedMilestones} of {formData.totalMilestones} completed</span>
                    <span className="font-medium">{parseInt(formData.totalMilestones) - parseInt(formData.completedMilestones)} remaining</span>
                  </div>
                </div>
              )}
            </div>

            <Button 
              onClick={handleSubmit}
              className="w-full h-12 sm:h-14 bg-gradient-to-r from-lime-500 via-lime-600 to-green-600 hover:from-lime-600 hover:via-lime-700 hover:to-green-700 text-white font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              Save Project
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}