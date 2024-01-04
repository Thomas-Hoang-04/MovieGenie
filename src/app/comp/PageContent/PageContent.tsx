import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PageContent({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value={title.toLowerCase()}
        title={title.toLowerCase()}
        className="border-none">
        <AccordionTrigger className="hover:no-underline font-semibold text-xl pb-3">
          {title}
        </AccordionTrigger>
        <AccordionContent className="text-sm font-medium border-t border-teal-700 dark:border-slate-200 pt-3">
          {content}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
