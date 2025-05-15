import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const RadioGroupPayment = () => {
  return (
    <div className="my-12 flex flex-col gap-2">
      <Label htmlFor="payment" className="text-lg font-semibold">
        Select Payment Method
      </Label>
      <RadioGroup defaultValue="option-one">
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="option-one"
            id="option-one"
            className="border-gray-600 p-2"
          />
          <Label htmlFor="option-one" className="text-base">
            Promptpay
            <img src="/PromptPay2.png" className="max-w-20"></img>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};
