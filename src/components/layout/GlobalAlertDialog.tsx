import { useGlobalAlertStore } from '@store/useGlobalAlertStore';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@components/ui/alert-dialog';

function GlobalAlertDialog() {
  const { isOpen, title, description, closeAlert } = useGlobalAlertStore();

  return (
    <AlertDialog open={isOpen} onOpenChange={closeAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle data-cy='alertDialogTitle'>
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription data-cy='alertDialogDescription'>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={closeAlert}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default GlobalAlertDialog;
