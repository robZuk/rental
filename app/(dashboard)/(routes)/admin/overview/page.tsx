import { CreditCard, DollarSign } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getReservationsCount } from "@/actions/get-reservations-count";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { formatter } from "@/lib/utils";

const DashboardPage = async () => {
  const totalRevenue = await getTotalRevenue();
  const graphRevenue = await getGraphRevenue();
  const reservationsCount = await getReservationsCount();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4  pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="flex flex-wrap gap-4">
          <Card className="w-[200px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card className="w-[200px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Reservations
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{reservationsCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
