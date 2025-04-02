
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { AssociationRule } from '@/utils/aprioriUtils';
import { cn } from '@/lib/utils';

type AssociationRuleCardProps = {
  rule: AssociationRule;
};

const AssociationRuleCard = ({ rule }: AssociationRuleCardProps) => {
  // Calculate color based on lift value
  const getLiftColor = (lift: number) => {
    if (lift >= 5) return "text-green-600";
    if (lift >= 3) return "text-emerald-500";
    if (lift >= 2) return "text-blue-500";
    return "text-gray-500";
  };

  return (
    <Card className="association-card h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="mb-2">Rule Insight</Badge>
          <Badge className="bg-primary/10 text-primary border-primary/20 font-normal">
            <TrendingUp className="h-3 w-3 mr-1" />
            Lift: {rule.lift.toFixed(2)}
          </Badge>
        </div>
        <CardTitle className="text-base">
          {rule.antecedent.join(", ")}
        </CardTitle>
        <CardDescription className="flex items-center mt-1">
          <ArrowRight className="h-4 w-4 mx-2" />
          {rule.consequent.join(", ")}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Support</span>
              <span className="text-sm text-muted-foreground">{(rule.support * 100).toFixed(2)}%</span>
            </div>
            <Progress value={rule.support * 100} className="h-2" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Confidence</span>
              <span className="text-sm text-muted-foreground">{(rule.confidence * 100).toFixed(2)}%</span>
            </div>
            <Progress value={rule.confidence * 100} className="h-2" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <p className="text-xs text-muted-foreground">
          When customers buy
          <span className="font-medium text-foreground"> {rule.antecedent.join(", ")}</span>, 
          they are 
          <span className={cn("font-medium", getLiftColor(rule.lift))}> {rule.lift.toFixed(1)}x </span> 
          more likely to also buy
          <span className="font-medium text-foreground"> {rule.consequent.join(", ")}</span>.
        </p>
      </CardFooter>
    </Card>
  );
};

export default AssociationRuleCard;
