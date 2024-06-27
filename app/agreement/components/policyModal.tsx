import { privacy, terms } from "@/app/lib/constants";
import { IPolicyModal } from "../page";

export default function PolicyModal({
  modalVisible,
}: {
  modalVisible: IPolicyModal;
}) {
  const isVisible = modalVisible.privacy || modalVisible.terms;
  return isVisible ? (
    <div className="break-normal">
      <pre className="whitespace-pre-wrap p-8">
        {modalVisible.privacy ? privacy : terms}
      </pre>
    </div>
  ) : (
    <></>
  );
}
