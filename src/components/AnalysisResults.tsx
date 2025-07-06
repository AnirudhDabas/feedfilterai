import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

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

interface AnalysisResultsProps {
  results: AnalysisResult;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results }) => {
  const getScoreColor = (score: number, type: 'bias' | 'toxicity' | 'sentiment') => {
    if (type === 'sentiment') {
      if (score > 0.3) return 'text-success';
      if (score < -0.3) return 'text-destructive';
      return 'text-muted-foreground';
    }
    
    if (score > 0.7) return 'text-destructive';
    if (score > 0.4) return 'text-warning';
    return 'text-success';
  };

  const getProgressColor = (score: number, type: 'bias' | 'toxicity' | 'sentiment') => {
    if (type === 'sentiment') {
      if (score > 0.3) return 'bg-success';
      if (score < -0.3) return 'bg-destructive';
      return 'bg-muted';
    }
    
    if (score > 0.7) return 'bg-destructive';
    if (score > 0.4) return 'bg-warning';
    return 'bg-success';
  };

  const formatSentimentScore = (score: number) => {
    const normalizedScore = ((score + 1) / 2) * 100;
    return Math.round(normalizedScore);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Analysis Results</h2>
        <p className="text-muted-foreground">
          AI-powered analysis of your content across multiple dimensions
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Bias Analysis */}
        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              Bias Detection
              <Badge 
                variant="outline" 
                className={`${getScoreColor(results.bias.score, 'bias')} border-current`}
              >
                {results.bias.label}
              </Badge>
            </CardTitle>
            <CardDescription>
              Political and ideological bias assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Bias Score</span>
                <span className={getScoreColor(results.bias.score, 'bias')}>
                  {Math.round(results.bias.score * 100)}%
                </span>
              </div>
              <Progress 
                value={results.bias.score * 100} 
                className="h-2"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {results.bias.details}
            </p>
          </CardContent>
        </Card>

        {/* Sentiment Analysis */}
        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              Sentiment Analysis
              <Badge 
                variant="outline"
                className={`${getScoreColor(results.sentiment.score, 'sentiment')} border-current`}
              >
                {results.sentiment.label}
              </Badge>
            </CardTitle>
            <CardDescription>
              Emotional tone and sentiment evaluation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sentiment Score</span>
                <span className={getScoreColor(results.sentiment.score, 'sentiment')}>
                  {formatSentimentScore(results.sentiment.score)}%
                </span>
              </div>
              <Progress 
                value={formatSentimentScore(results.sentiment.score)} 
                className="h-2"
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Confidence</span>
              <span className="text-foreground">
                {Math.round(results.sentiment.confidence * 100)}%
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Toxicity Analysis */}
        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              Toxicity Detection
              <Badge 
                variant="outline"
                className={`${getScoreColor(results.toxicity.score, 'toxicity')} border-current`}
              >
                {results.toxicity.label}
              </Badge>
            </CardTitle>
            <CardDescription>
              Harmful or toxic content identification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Toxicity Score</span>
                <span className={getScoreColor(results.toxicity.score, 'toxicity')}>
                  {Math.round(results.toxicity.score * 100)}%
                </span>
              </div>
              <Progress 
                value={results.toxicity.score * 100} 
                className="h-2"
              />
            </div>
            {results.toxicity.categories.length > 0 && (
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">Detected Categories</span>
                <div className="flex flex-wrap gap-1">
                  {results.toxicity.categories.map((category, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="text-xs bg-destructive/10 text-destructive border-destructive/20"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-card shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Summary & Recommendations</CardTitle>
          <CardDescription>
            Overall assessment and suggested actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 bg-background/30 rounded-lg border border-border/30">
              <h4 className="font-medium text-foreground mb-2">Content Assessment</h4>
              <p className="text-sm text-muted-foreground">
                {results.bias.score > 0.7 || results.toxicity.score > 0.7
                  ? "⚠️ This content shows high levels of bias or toxicity. Consider fact-checking and seeking alternative sources."
                  : results.bias.score > 0.4 || results.toxicity.score > 0.4
                  ? "⚡ This content shows moderate bias or negative sentiment. Additional context may be helpful."
                  : "✅ This content appears relatively neutral and balanced. Proceed with normal consumption."}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                AI Analysis Complete
              </Badge>
              <Badge variant="outline" className="border-success/30 text-success">
                Multi-dimensional Scoring
              </Badge>
              <Badge variant="outline" className="border-muted text-muted-foreground">
                Real-time Processing
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisResults;