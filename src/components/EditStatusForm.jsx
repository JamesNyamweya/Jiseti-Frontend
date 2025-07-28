import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditStatusForm = ({ currentStatus, onSubmit, onClose }) => {
  const validationSchema = Yup.object({
    status: Yup.string()
      .oneOf(["under investigation", "resolved", "rejected"])
      .required("Status is required"),
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4">Edit Record Status</h2>

        <Formik
          initialValues={{ status: currentStatus }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await onSubmit(values); 
              onClose(); 
            } catch (error) {
              console.error("Update failed:", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block mb-1 font-medium">New Status</label>
                <Field
                  as="select"
                  name="status"
                  className="w-full border rounded p-2 bg-white"
                >
                  <option value="">Select status</option>
                  <option value="under investigation">
                    Under Investigation
                  </option>
                  <option value="resolved">Resolved</option>
                  <option value="rejected">Rejected</option>
                </Field>
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  {isSubmitting ? "Updating..." : "Update"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditStatusForm;
