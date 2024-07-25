import React, { useState } from "react";
import { Form, Breadcrumb, Input, Badge, Card, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import SuccessModal from "../../components/common/modal/success";
import emailjs from 'emailjs-com';

function Inquiry() {
    const [form] = Form.useForm();
    const [responseMessage, setResponseMessage] = useState('');
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();

    const handleFinish = (values) => {
        emailjs.send(
            'service_fo1405i',
            'template_iu1qnxe',
            values,
            'W7D_Exy1e6L7Nj_Pp'
        ).then((result) => {
            console.log(result.text);
            setResponseMessage('Thank you for contacting us!');
            setOpen(true);
            form.resetFields();
        }, (error) => {
            console.log(error.text);
            setResponseMessage('Something went wrong. Please try again later.');
        });
    };

    const handleClose = () => setOpen(false);

    return (
        <>
            <section id="main-section" className="cart-section-main-1 flex items-center justify-center">
                <div id="login" className="w-full py-5">
                    <Breadcrumb
                        className="p-5"
                        separator=">"
                        items={[
                            { title: 'TOP PAGE', href: '/' },
                            { title: 'お問い合わせ' },
                        ]}
                    />
                    <Badge.Ribbon text={t("お問い合わせ")} color="red" className="mt-4 p-2 px-7 text-xl">
                        <Card size="small">
                            <Form
                                form={form}
                                className="max-w-[640px] w-full mx-auto px-4 py-20"
                                onFinish={handleFinish}
                            >
                                <Form.Item
                                    label="お名前"
                                    name="name"
                                    rules={[{ required: true, message: 'お名前を入力してください。' }]}
                                >
                                    <Input className="p-2 sm:ml-16 sm:w-96" />
                                </Form.Item>
                                <Form.Item
                                    label="メール"
                                    name="email"
                                    rules={[{ required: true, message: 'メールアドレスを入力してください。' }]}
                                >
                                    <Input className="p-2 sm:ml-16 sm:w-96" />
                                </Form.Item>
                                <Form.Item
                                    label="お問い合わせ内容"
                                    name="message"
                                    rules={[{ required: true, message: 'お問い合わせ内容を入力してください。' }]}
                                >
                                    <Input.TextArea className="p-2 sm:w-96" rows={8} />
                                </Form.Item>
                                <Form.Item className="flex items-center justify-center">
                                    <Button
                                        className="w-[320px] mx-auto text-md font-normal select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        送信する
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                        <SuccessModal
                            open={open}
                            onCancel={handleClose}
                            title="お問い合わせ内容が送信されました。"
                        />
                        {responseMessage && <p>{responseMessage}</p>}
                    </Badge.Ribbon>
                </div>
            </section>
        </>
    );
}

export default Inquiry;
