import SingleBranch from "@/feature/branches/SingleBranch";

interface Props {
    params: Promise<{ slug: string }>;
}

export default function BranchSinglePage({ params }: Props) {
    return <SingleBranch params={params} />;
}