import Button from '@/components/ui/Button/Button';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import Form from '@/components/ui/Form';
import Input from '@/components/ui/Input/Input';
import Textarea from '@/components/ui/Textarea/Textarea';
import Typography from '@/components/ui/Typography/Typography';
import { useTranslation } from 'react-i18next';
import { statusOptions } from '../../../constants/statusOptions';
import { priorityOptions } from '@/constants/priorityOptions';
import type { TaskFormValues, TaskTypes } from '../types/TaskTypes';
import type { FormSubmitEvent } from '@/components/ui/Form/Form.types';

export interface TaskFormProps {
  mode?: 'create' | 'edit';
  initialValues?: TaskTypes;
  onClose: (open: boolean) => void;
  handleSubmit: (values: TaskFormValues, event: FormSubmitEvent) => void;
}

export default function TaskForm(props: TaskFormProps) {
  const { mode = 'create', initialValues, onClose, handleSubmit } = props;

  const { t } = useTranslation();

  const isEdit = mode === 'edit';

  return (
    <Form<TaskTypes>
      key={`${mode}-${initialValues?.id ?? 'new'}`}
      initialValues={
        initialValues ?? {
          priority: 'medium',
          status: 'todo',
        }
      }
      onSubmit={handleSubmit}
      className="p-6"
    >
      <Form.Item
        name="title"
        label={t('my-tasks.form.task-title')}
        rules={[{ required: true, min: 3 }]}
      >
        <Input placeholder={t('my-tasks.placeholder.enter-task-title')} hideIcon />
      </Form.Item>

      <Form.Item name="description" label={t('my-tasks.form.desc')} rules={[{ max: 500 }]}>
        <Textarea placeholder={t('my-tasks.placeholder.enter-desc')} rows={4} />
      </Form.Item>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Form.Item name="project" label={t('my-tasks.form.project')}>
          <Dropdown
            placeholder={t('my-tasks.placeholder.select-project')}
            icon="FolderIcon"
            options={[
              { label: 'Website Redesign', value: 'website' },
              { label: 'Mobile App', value: 'mobile' }, //TODO:
            ]}
          />
        </Form.Item>

        <Form.Item name="priority" label={t('my-tasks.form.priority')}>
          <Dropdown
            placeholder={t('my-tasks.placeholder.select-priority')}
            defaultValue="medium"
            options={priorityOptions}
          />
        </Form.Item>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Form.Item name="status" label={t('my-tasks.form.status')}>
          <Dropdown
            placeholder={t('my-tasks.placeholder.select-status')}
            defaultValue="todo"
            options={statusOptions}
          />
        </Form.Item>

        <Form.Item name="dueDate" label={t('my-tasks.form.due-date')}>
          <Input type="date" icon="CalendarDotsIcon" />
        </Form.Item>
      </div>

      <div className="border-border mt-8 flex justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          className="h-9 gap-2 px-4 font-sans"
          onClick={() => onClose(false)}
        >
          <Typography as="p" variant="caption" className="truncate">
            {t('common.cancel')}
          </Typography>
        </Button>

        <Button type="submit" variant="primary" className="h-9 gap-2 px-4 font-sans">
          <Typography as="p" variant="caption" className="truncate">
            {isEdit ? t('common.save-changes') : t('common.create-task')}
          </Typography>
        </Button>
      </div>
    </Form>
  );
}
