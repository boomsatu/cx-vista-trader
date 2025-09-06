export const TradingChart = () => {
  return (
    <div className="flex-grow bg-trading-bg">
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-muted/20 to-muted/10 border border-trading-border">
        <div className="text-center space-y-4">
          <div className="text-6xl">📈</div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">TradingView Chart</h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              In a real implementation, this would integrate with TradingView's charting library to display live price charts, technical indicators, and trading tools.
            </p>
          </div>
          <div className="flex justify-center space-x-2">
            <div className="h-2 w-2 bg-success rounded-full animate-pulse"></div>
            <div className="h-2 w-2 bg-success rounded-full animate-pulse delay-75"></div>
            <div className="h-2 w-2 bg-success rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
      </div>
    </div>
  );
};