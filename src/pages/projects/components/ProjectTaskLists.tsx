import Modal from '@/components/ui/Modal/Modal';
import type { ProjectTypes } from '../types/Project.types';
import ProjectViewHeader from './ProjectViewHeader';
import MyTasks from '@/pages/my-tasks/MyTasks';
import { useTranslation } from 'react-i18next';

interface ProjectTaskListsProps {
  viewAllTasks: boolean;
  setViewAllTasks: () => void;
  handleRefresh: () => void;
  viewProject: ProjectTypes;
}

export default function ProjectTaskLists(props: ProjectTaskListsProps) {
  const { viewProject, viewAllTasks, setViewAllTasks, handleRefresh } = props;

  const { t } = useTranslation();

  return (
    <Modal
      size="xl"
      height="h-[80dvh]"
      headerVariant="view"
      open={viewAllTasks}
      onClose={setViewAllTasks}
      title={viewProject.name}
      headerContent={
        <ProjectViewHeader
          viewProject={viewProject}
          viewTasksDesc={t('project.view.all-tasks-project')}
        />
      }
    >
      <div className="flex h-full min-h-0 flex-col">
        <MyTasks
          projectId={viewProject.id}
          variant="projectTaskLists"
          handleRefresh={handleRefresh}
        />
      </div>
    </Modal>
  );
}
