import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AnalysisResults from './AnalysisResults';
import { useToast } from '@/hooks/use-toast';

interface AnalysisResult {
  bias: {
    score: number;
    label: string;
    details: string;
  };
  sentiment: {
    score: number;
    label: string;
    confidence: number;
  };
  toxicity: {
    score: number;
    label: string;
    categories: string[];
  };
}

const ContentAnalyzer = () => {
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const mockAnalyze = async (text: string): Promise<AnalysisResult> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis based on content
    const wordCount = text.split(' ').length;
    const hasNegativeWords = /hate|awful|terrible|worst|stupid/i.test(text);
    const hasPositiveWords = /great|amazing|wonderful|excellent|love/i.test(text);
    
    return {
      bias: {
        score: Math.random() * 0.6 + (hasNegativeWords ? 0.4 : 0),
        label: hasNegativeWords ? 'High Bias Detected' : wordCount > 50 ? 'Moderate Bias' : 'Low Bias',
        details: hasNegativeWords ? 'Strong emotional language detected' : 'Relatively neutral language'
      },
      sentiment: {
        score: hasPositiveWords ? 0.8 : hasNegativeWords ? -0.7 : Math.random() * 0.4 - 0.2,
        label: hasPositiveWords ? 'Positive' : hasNegativeWords ? 'Negative' : 'Neutral',
        confidence: Math.random() * 0.3 + 0.7
      },
      toxicity: {
        score: hasNegativeWords ? Math.random() * 0.4 + 0.6 : Math.random() * 0.3,
        label: hasNegativeWords ? 'High Toxicity' : 'Low Toxicity',
        categories: hasNegativeWords ? ['Offensive Language', 'Hostility'] : []
      }
    };
  };

  const handleAnalyze = async () => {
    if (!content.trim()) {
      toast({
        title: "Content Required",
        description: "Please enter some content to analyze.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const analysisResult = await mockAnalyze(content);
      setResults(analysisResult);
      toast({
        title: "Analysis Complete",
        description: "Content analysis has been completed successfully."
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "An error occurred during analysis. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearAnalysis = () => {
    setContent('');
    setResults(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="bg-gradient-card shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Content Analysis Tool
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              AI Powered
            </Badge>
          </CardTitle>
          <CardDescription>
            Enter your content below to analyze it for bias, sentiment, and toxicity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium text-foreground">
              Content to Analyze
            </label>
            <Textarea
              id="content"
              placeholder="Paste or type the content you want to analyze here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px] bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
              disabled={isAnalyzing}
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{content.length} characters</span>
              <span>{content.split(' ').filter(word => word.length > 0).length} words</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={handleAnalyze}
              disabled={isAnalyzing || !content.trim()}
              className="bg-gradient-primary shadow-elegant hover:shadow-glow transition-all duration-300"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                  Analyzing...
                </>
              ) : (
                'Analyze Content'
              )}
            </Button>
            
            {(content || results) && (
              <Button 
                variant="outline" 
                onClick={clearAnalysis}
                disabled={isAnalyzing}
                className="border-border/50 hover:bg-accent/50"
              >
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {results && <AnalysisResults results={results} />}
    </div>
  );
};

export default ContentAnalyzer;