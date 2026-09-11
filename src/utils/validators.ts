import type { VisitorFormValues, VisitorFormErrors } from '@/types/visitor';

const PHONE_REGEX = /^[6-9]\d{9}$/;
const NAME_REGEX = /^[a-zA-Z\s.'-]+$/;

export function validateVisitorForm(values: VisitorFormValues): VisitorFormErrors {
  const errors: VisitorFormErrors = {};

  const name = values.name.trim();
  if (!name) {
    errors.name = 'Name is required.';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (!NAME_REGEX.test(name)) {
    errors.name = 'Name can only contain letters, spaces and . \' -';
  }

  const phone = values.phone.trim();
  if (!phone) {
    errors.phone = 'Phone number is required.';
  } else if (!PHONE_REGEX.test(phone)) {
    errors.phone = 'Enter a valid 10-digit mobile number.';
  }

  const unit = values.unit.trim();
  if (!unit) {
    errors.unit = 'Unit is required.';
  } else if (unit.length > 20) {
    errors.unit = 'Unit must be under 20 characters.';
  }

  if (!values.visitDate) {
    errors.visitDate = 'Visit date is required.';
  } else {
    const selected = new Date(values.visitDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
      errors.visitDate = 'Visit date cannot be in the past.';
    }
  }

  return errors;
}

export function isFormValid(errors: VisitorFormErrors): boolean {
  return Object.keys(errors).length === 0;
}
