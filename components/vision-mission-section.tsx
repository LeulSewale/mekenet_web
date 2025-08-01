import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Target, Heart } from "lucide-react"

export function VisionMissionSection() {
  return (
    <section id="vision-mission" className="py-8 sm:py-12 md:py-16 lg:py-24 xl:py-32 bg-muted/50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
              Our Vision & Mission
            </h2>
            <p className="max-w-[900px] text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground">
              Driving financial inclusion and empowerment through innovative digital solutions
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl items-stretch gap-6 py-8 sm:py-12 lg:grid-cols-2 lg:gap-8 xl:gap-12">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Eye className="h-5 w-5" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                To be the leading digital financial cooperative in our region, providing accessible, innovative, and
                member-centric financial services that empower individuals and communities to achieve financial
                prosperity and security.
              </p>
              <p className="text-muted-foreground">
                We envision a future where every member has the tools and support needed to build wealth, secure their
                families' futures, and contribute to sustainable community development.
              </p>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Target className="h-5 w-5" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                To provide exceptional financial services through innovative digital platforms, fostering financial
                literacy, promoting savings culture, and offering affordable credit solutions to our members.
              </p>
              <p className="text-muted-foreground">
                We are committed to delivering personalized service, maintaining the highest standards of integrity, and
                continuously adapting to meet the evolving needs of our community.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mx-auto max-w-5xl">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Heart className="h-5 w-5" />
                </div>
                <CardTitle className="text-2xl">Our Core Values</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="text-center space-y-2 p-4">
                  <h4 className="font-semibold text-sm sm:text-base">Integrity</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Maintaining honesty and transparency in all our dealings
                  </p>
                </div>
                <div className="text-center space-y-2 p-4">
                  <h4 className="font-semibold text-sm sm:text-base">Innovation</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Embracing technology to deliver cutting-edge solutions
                  </p>
                </div>
                <div className="text-center space-y-2 p-4">
                  <h4 className="font-semibold text-sm sm:text-base">Community</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Putting our members and community first in everything we do
                  </p>
                </div>
                <div className="text-center space-y-2 p-4">
                  <h4 className="font-semibold text-sm sm:text-base">Excellence</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Striving for the highest quality in service delivery
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
