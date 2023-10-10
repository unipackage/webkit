import React from "react"
import { Form as AntForm, Input, Button, Space } from "antd"
import { formatTitle } from "../../shared/format"

const formItemLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 14 },
}

interface Field {
    name: string
    label: string
    customComponent?: React.ReactNode
    required?: boolean
}

interface FormProps {
    name: string
    fields: Array<Field>
    onFinish: (values: Record<string, any>) => void
    initialValues?: Record<string, any>
}

/*
usage:
    const formData = {
        name: "",
        age: 0,
        email: "",
    };

    const customFieldRules = {
        age: {
            label: "Age",
            required: true,
            customComponent: <Input type="number" />,
        },
    };

    const fields = convertDataToFormFields(formData, customFieldRules);

    const onFinish = (values) => {
        console.log("Form values:", values);
    };

    <Form
        name="yourForm"
        fields={fields}
        onFinish={onFinish}
        initialValues={formData}
    />
*/
export const Form: React.FC<FormProps> = ({
    name,
    fields,
    onFinish,
    initialValues,
}) => {
    const onFinishHandler = (values: Record<string, any>) => {
        onFinish(values)
    }

    return (
        <>
            {{ name } && <h3>{name}</h3>}
            <AntForm
                name={name}
                onFinish={onFinishHandler}
                initialValues={initialValues}
                {...formItemLayout}
                style={{ maxWidth: 600 }}
            >
                {fields.map((field) => (
                    <AntForm.Item
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        hasFeedback
                        rules={[
                            {
                                required: field.required !== false,
                                message: `Please input ${field.label}`,
                            },
                        ]}
                    >
                        {field.customComponent ? (
                            field.customComponent
                        ) : (
                            <Input placeholder={`Enter ${field.label}`} />
                        )}
                    </AntForm.Item>
                ))}

                <AntForm.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="reset">reset</Button>
                    </Space>
                </AntForm.Item>
            </AntForm>
        </>
    )
}

export function convertDataToFormFields<T extends Record<string, any>>(
    obj: T,
    customFieldRules?: Partial<Record<keyof T, Partial<Field>>>
): Field[] {
    const fields: Field[] = []

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const fieldInfo = customFieldRules
                ? customFieldRules[key as keyof T]
                : ({} as Field)
            const field: Field = {
                name: key,
                label: fieldInfo?.label || formatTitle(key),
                required: fieldInfo?.required || true,
                customComponent: fieldInfo?.customComponent || (
                    <Input placeholder={`Enter ${formatTitle(key)}`} />
                ),
            }
            fields.push(field)
        }
    }
    return fields
}
