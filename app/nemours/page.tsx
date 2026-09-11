import Guide from "../guide";
import { courseMetadata } from "../course-metadata";

export const metadata = courseMetadata("Nemours Course", "nemours");

export default function NemoursPage() {
  return <Guide courseId="nemours" />;
}
