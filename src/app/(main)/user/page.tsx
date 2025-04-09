import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-medium text-muted-foreground">
                Email
              </h2>
              <p className="text-lg">user@example.com</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-muted-foreground">
                Member Since
              </h2>
              <p className="text-lg">January 2024</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
