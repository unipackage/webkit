import React from "react"
import { Form as AntForm, Button, Input } from "antd"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"

interface FormListProps {
    name: string
    minLength: number
    maxLength: number
    renderField?: (field: any) => React.ReactNode
    formItemLayout?: any
    initialValues?: any[]
}

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
}

/*
usage:

 <CustomFormList
     name="replicasCountries"
     renderField={(field) => (
         <Input placeholder="country name" style={{ width: "60%" }} />
     )}
     minLength={1}
     maxLength={10}
 />
*/
export const FormList: React.FC<FormListProps> = ({
    name,
    minLength,
    maxLength,
    renderField,
    formItemLayout,
    initialValues,
}) => {
    return (
        <AntForm.List
            name={name}
            key={name}
            {...formItemLayout}
            initialValue={{
                ...{ minLength: 1, maxLength: 10 },
                ...initialValues,
            }}
            rules={[
                {
                    validator: async (_, names) => {
                        if (
                            !names ||
                            names.length < minLength ||
                            names.length > maxLength
                        ) {
                            throw new Error(
                                `At least ${minLength} items and at most ${maxLength} items are required.`
                            )
                        }
                    },
                },
            ]}
        >
            {(fields, { add, remove }, { errors }) => (
                <>
                    {fields.map((field, index) => (
                        <AntForm.Item
                            {...(index === 0
                                ? formItemLayoutWithOutLabel
                                : formItemLayoutWithOutLabel)}
                            required={false}
                            key={field.key}
                        >
                            <AntForm.Item
                                {...field}
                                validateTrigger={["onChange", "onBlur"]}
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        message:
                                            "Please input or delete this field.",
                                    },
                                ]}
                                noStyle
                            >
                                {index + 1}:{" "}
                                {renderField ? (
                                    renderField({ ...field })
                                ) : (
                                    <Input
                                        placeholder={name}
                                        style={{ width: "60%" }}
                                    />
                                )}{" "}
                            </AntForm.Item>
                            {fields.length > 1 ? (
                                <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    onClick={() => remove(field.name)}
                                />
                            ) : null}
                        </AntForm.Item>
                    ))}

                    <AntForm.Item>
                        <Button
                            type="dashed"
                            onClick={() => add()}
                            style={{ width: "60%" }}
                            icon={<PlusOutlined />}
                        >
                            Add {name}
                        </Button>
                        <AntForm.ErrorList errors={errors} />
                    </AntForm.Item>
                </>
            )}
        </AntForm.List>
    )
}
