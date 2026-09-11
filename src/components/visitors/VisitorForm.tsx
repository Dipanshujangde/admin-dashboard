import { FormEvent, useState } from 'react';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { validateVisitorForm, isFormValid } from '@/utils/validators';
import type { VisitorFormErrors, VisitorFormValues } from '@/types/visitor';

interface VisitorFormProps {
  initialValues?: VisitorFormValues;
  isSubmitting: boolean;
  submitLabel?: string;
  onSubmit: (values: VisitorFormValues) => void;
  onCancel: () => void;
}

const emptyValues: VisitorFormValues = {
  name: '',
  phone: '',
  unit: '',
  visitDate: '',
};

export default function VisitorForm({
  initialValues = emptyValues,
  isSubmitting,
  submitLabel = 'Add visitor',
  onSubmit,
  onCancel,
}: VisitorFormProps) {
  const [values, setValues] = useState<VisitorFormValues>(initialValues);
  const [errors, setErrors] = useState<VisitorFormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (field: keyof VisitorFormValues, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) {
      setErrors(validateVisitorForm(next));
    }
  };

  const handleBlur = (field: keyof VisitorFormValues) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validateVisitorForm(values));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateVisitorForm(values);
    setErrors(validationErrors);
    setTouched({ name: true, phone: true, unit: true, visitDate: true });

    if (isFormValid(validationErrors)) {
      onSubmit({
        name: values.name.trim(),
        phone: values.phone.trim(),
        unit: values.unit.trim(),
        visitDate: values.visitDate,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <Input
        label="Full name"
        placeholder="e.g. Rohit Malhotra"
        value={values.name}
        onChange={(e) => handleChange('name', e.target.value)}
        onBlur={() => handleBlur('name')}
        error={touched.name ? errors.name : undefined}
        autoFocus
      />
      <Input
        label="Phone number"
        placeholder="10-digit mobile number"
        inputMode="numeric"
        maxLength={10}
        value={values.phone}
        onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, ''))}
        onBlur={() => handleBlur('phone')}
        error={touched.phone ? errors.phone : undefined}
      />
      <Input
        label="Unit"
        placeholder="e.g. A-204"
        value={values.unit}
        onChange={(e) => handleChange('unit', e.target.value)}
        onBlur={() => handleBlur('unit')}
        error={touched.unit ? errors.unit : undefined}
      />
      <Input
        label="Visit date"
        type="date"
        value={values.visitDate}
        onChange={(e) => handleChange('visitDate', e.target.value)}
        onBlur={() => handleBlur('visitDate')}
        error={touched.visitDate ? errors.visitDate : undefined}
      />

      <div className="mt-2 flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
