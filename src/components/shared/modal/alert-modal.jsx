'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/shared/modal';
import { Loader2 } from 'lucide-react';

export const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const Processing = () => (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Processing...
    </>
  )

  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          {loading ? <Processing /> : "Confirm"}
        </Button>
      </div>
    </Modal>
  );
};
