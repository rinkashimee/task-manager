import Form from '@/components/ui/Form';
import type { ProjectFormProps, ProjectTypes } from '../types/Project.types';
import Input from '@/components/ui/Input/Input';
import Textarea from '@/components/ui/Textarea/Textarea';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import Button from '@/components/ui/Button/Button';
import Typography from '@/components/ui/Typography/Typography';
import { useTranslation } from 'react-i18next';
import ProjectIconPicker from './ProjectIconPicker';
import { projectStatusOptions } from '@/constants/projectStatusOptions';

export default function ProjectForm(props: ProjectFormProps) {
  const { mode = 'create', initialValues, isSubmitting, onClose, handleSubmit } = props;

  const { t } = useTranslation();

  const isEdit = mode === 'edit';

  return (
    <Form<ProjectTypes>
      key={`${mode}-${initialValues?.id ?? 'new'}`}
      initialValues={
        initialValues ?? {
          status: 'not-started',
          projectIcon: 'globe',
        }
      }
      onSubmit={handleSubmit}
      className="p-6"
    >
      <Form.Item name="name" label={t('project.form.name')} rules={[{ required: true, min: 3 }]}>
        <Input placeholder={t('project.placeholder.project-name')} hideIcon />
      </Form.Item>

      <Form.Item name="description" label={t('project.form.desc')} rules={[{ max: 500 }]}>
        <Textarea placeholder={t('project.placeholder.desc')} rows={4} />
      </Form.Item>

      <Form.Item name="status" label={t('project.form.status')}>
        <Dropdown
          placeholder={t('project.placeholder.select-status')}
          options={projectStatusOptions}
        />
      </Form.Item>

      <Form.Item name="dueDate" label={t('project.form.due-date')}>
        <Input type="date" icon="CalendarDotsIcon" />
      </Form.Item>

      <Form.Item name="projectIcon" label={t('project.form.icon')}>
        <ProjectIconPicker />
      </Form.Item>

      <div className="border-border mt-8 flex justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          className="h-9 gap-2 px-4 font-sans"
          onClick={() => onClose(false)}
          disabled={isSubmitting}
        >
          <Typography as="p" variant="caption" className="truncate">
            {t('common.cancel')}
          </Typography>
        </Button>

        <Button
          type="submit"
          variant="primary"
          className="h-9 gap-2 px-4 font-sans"
          disabled={isSubmitting}
        >
          <Typography as="p" variant="caption" className="truncate">
            {isSubmitting
              ? isEdit
                ? t('common.saving')
                : t('common.creating')
              : isEdit
                ? t('common.save-changes')
                : t('common.create-project')}
          </Typography>
        </Button>
      </div>
    </Form>
  );
}
