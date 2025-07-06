import ContentAnalyzer from "@/components/ContentAnalyzer";
import heroBanner from "@/assets/hero-banner.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroBanner})` }}
        />
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Feed Filter AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Analyze online content for bias, sentiment, and toxicity using advanced AI technology. 
              Get instant insights to make informed decisions about the content you consume and share.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full border border-border/30">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">AI-Powered Analysis</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full border border-border/30">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">Real-time Processing</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full border border-border/30">
                <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">Multi-dimensional Scoring</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <ContentAnalyzer />
      </div>
    </div>
  );
};

export default Index;