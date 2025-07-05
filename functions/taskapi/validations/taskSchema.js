const yup = require('yup');

const taskCreateSchema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().optional(),
    status: yup.string().oneOf(['pending', 'completed']).default('pending')
});

const taskUpdateSchema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().optional(),
    status: yup.string().oneOf(['pending', 'completed'])
});

module.exports = {
    taskCreateSchema,
    taskUpdateSchema
};
