export interface WidgetCaptionProps {
  text: string;
  disclaimer?: string;
}

const WidgetCaption = ({ text, disclaimer }: WidgetCaptionProps): JSX.Element => {
  return (
    <div className="px-3 py-2 border border-t-0 rounded-bl rounded-br shadow-sm border-gray-light shadow-gray-light">
      <span className="text-xs italic">{text}</span><br/>
      <span className="text-xs italic">{disclaimer}</span>
    </div>
  );
};

export default WidgetCaption;
