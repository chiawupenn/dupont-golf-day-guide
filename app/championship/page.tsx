import Guide from "../guide";
import { courseMetadata } from "../course-metadata";

export const metadata = courseMetadata("Championship Course", "championship");

export default function ChampionshipPage() {
  return <Guide courseId="championship" />;
}
