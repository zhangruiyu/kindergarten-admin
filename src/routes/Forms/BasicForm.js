import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Card, Form, Input } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(state => ({
  submitting: state.form.regularFormSubmitting,
}))
@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(`values===${values}`);
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  }

  render() {
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout title="添加banner图" content="用于添加首页的轮播图">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="标题"
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '请输入标题',
                }],
              })(
                <Input placeholder="给banner活动图起个名字" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="图片的url"
            >
              {getFieldDecorator('picUrl', {
                rules: [{
                  required: true, message: '请输入图片链接(全链接)',
                }],
              })(
                <TextArea style={{ minHeight: 256 }} placeholder="请输入图片链接(全链接)" rows={5} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="跳转的链接"
            >
              {getFieldDecorator('url', {
                rules: [{
                  required: true, message: '请输入点击跳转链接',
                }],
              })(
                <TextArea style={{ minHeight: 256 }} placeholder="请输入点击跳转链接" rows={5} />
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
