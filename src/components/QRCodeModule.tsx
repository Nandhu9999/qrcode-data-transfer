import QRCode from "react-qr-code";
import { useData } from "../contexts/DataContext";

type QRCodeModuleProps = {};
const QRCodeModule = ({}: QRCodeModuleProps) => {
  const { qrValue } = useData();
  return (
    <div className="flex h-full w-full items-center justify-center">
      <QRCode className="aspect-square h-full" value={qrValue} />
    </div>
  );
};

export default QRCodeModule;
