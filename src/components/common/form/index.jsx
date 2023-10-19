import { Formik, Form } from "formik";

export const MyForm = ({ children, initialValues, validation, submit, classes }) => {
  // ---------- render jsx ----------
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={submit}
      validateOnBlur={false}
    >
      <Form className={`w-full max-h-[inherit] ${classes} dark:bg-dark_custom-average-black`}>{children}</Form>
    </Formik>
  );
};
