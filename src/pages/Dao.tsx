import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, FileText, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Hardcoded DAO member addresses
const daoMembers = [
  "0xe8fa5c28ca55b1dfbb6bcdbace5a6f22f487d662",
  "0x49c2e4db36d3ac470ad072ddc17774257a043097",
  "0x5300291345607c4a253a27654b740274e1e82203",
  "0x486bea6b90243d2ff3ee2723a47605c3361c3d95",
  "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b" // Added a fifth address for completeness
];

// Initial hardcoded proposals
const initialProposals = [
  {
    id: 1,
    title: "Proposal #001: Increase Warehouse Registration Fee",
    description: "Proposal to increase the one-time warehouse registration fee from 100 HBAR to 150 HBAR to fund community grants.",
    status: "Active",
    votesFor: 2,
    votesAgainst: 1,
    voted: false,
  },
  {
    id: 2,
    title: "Proposal #002: Fund a Marketing Campaign in East Asia",
    description: "Allocate 50,000 HBAR from the treasury to fund a targeted marketing campaign to onboard more farmers and warehouse owners in the East Asia region.",
    status: "Passed",
    votesFor: 4,
    votesAgainst: 1,
    voted: true,
  },
  {
    id: 3,
    title: "Proposal #003: Integrate with a Stablecoin for Payments",
    description: "Begin research and development to allow warehouse booking payments using USDC in addition to HBAR.",
    status: "Failed",
    votesFor: 1,
    votesAgainst: 4,
    voted: true,
  },
];

const DaoPage = () => {
  const [proposals, setProposals] = useState(initialProposals);
  const { toast } = useToast();
  const totalVotes = daoMembers.length;

  const handleVote = (proposalId: number, voteType: 'for' | 'against') => {
    setProposals(proposals.map(p => {
      if (p.id === proposalId && !p.voted) {
        toast({
          title: "Vote Cast!",
          description: `You voted '${voteType.toUpperCase()}' for Proposal #${String(proposalId).padStart(3, '0')}.`,
        });
        return {
          ...p,
          votesFor: voteType === 'for' ? p.votesFor + 1 : p.votesFor,
          votesAgainst: voteType === 'against' ? p.votesAgainst + 1 : p.votesAgainst,
          voted: true,
        };
      }
      return p;
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-off-white">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              DAO Governance
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Participate in the decision-making process of the Ceres Protocol.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Proposals Section */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Active & Past Proposals
              </h2>
              {proposals.map((proposal) => {
                const currentTotalVotes = proposal.votesFor + proposal.votesAgainst;
                const forPercentage = (proposal.votesFor / totalVotes) * 100;
                const againstPercentage = (proposal.votesAgainst / totalVotes) * 100;

                return (
                  <Card key={proposal.id} className="card-lift animate-slide-up" style={{ animationDelay: `${proposal.id * 0.1}s` }}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg pr-4">{proposal.title}</CardTitle>
                        <Badge
                          variant={
                            proposal.status === "Active" ? "default" :
                            proposal.status === "Passed" ? "secondary" : "destructive"
                          }
                          className="flex-shrink-0"
                        >
                          {proposal.status}
                        </Badge>
                      </div>
                      <CardDescription>{proposal.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-secondary">{proposal.votesFor} For ({forPercentage.toFixed(0)}%)</span>
                          <span className="font-medium text-destructive">{proposal.votesAgainst} Against ({againstPercentage.toFixed(0)}%)</span>
                        </div>
                        <Progress value={(currentTotalVotes / totalVotes) * 100} className="h-3" />
                         <p className="text-xs text-muted-foreground mt-2">{currentTotalVotes} of {totalVotes} members have voted.</p>
                      </div>
                    </CardContent>
                    {proposal.status === "Active" && (
                      <CardFooter className="flex gap-4">
                        <Button
                          variant="secondary"
                          className="w-full"
                          onClick={() => handleVote(proposal.id, 'for')}
                          disabled={proposal.voted}
                        >
                          <Check className="mr-2 h-4 w-4" /> Vote For
                        </Button>
                        <Button
                          variant="destructive"
                          className="w-full"
                          onClick={() => handleVote(proposal.id, 'against')}
                          disabled={proposal.voted}
                        >
                          <X className="mr-2 h-4 w-4" /> Vote Against
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                );
              })}
            </div>

            {/* Members Section */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    DAO Members
                  </CardTitle>
                  <CardDescription>
                    There are currently {daoMembers.length} voting members in the DAO.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {daoMembers.map((address, index) => (
                      <li key={index} className="flex items-center gap-3 text-sm font-mono bg-off-white p-2 rounded-md">
                        <span className="text-muted-foreground">#{index + 1}</span>
                        <span className="truncate text-foreground" title={address}>
                          {`${address.substring(0, 8)}...${address.substring(address.length - 6)}`}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DaoPage;