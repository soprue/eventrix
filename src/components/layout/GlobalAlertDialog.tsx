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
      <AlertDialogContent className='mobile:w-[250px] rounded-md'>
        <AlertDialogHeader>
          <AlertDialogTitle data-cy='alert-dialog-title' className='break-keep'>
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription
            data-cy='alert-dialog-description'
            className='break-keep'
          >
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
