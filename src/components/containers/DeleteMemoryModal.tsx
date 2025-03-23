import DefaultModal from "@/components/ui/modals/DefaultModal";

type DeleteMemoryModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteMemoryModal({
  onConfirm,
  onCancel,
}: DeleteMemoryModalProps) {
  return (
    <DefaultModal
      type="danger"
      title="Delete memory"
      description="Are you sure you want to delete this memory? This action cannot be undone."
      actionText="Delete"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
