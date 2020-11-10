import React, { Fragment } from "react";
import {
  Row,
  Col,
  Image,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
} from "antd";
import { useSetRecoilState } from "recoil";
import { useAuth } from "../../context/authContext";
import logo from "../../assets/images/logo.png";
import { FadeIn, SlideLeft } from "../../animations";
import { USERNAME, PASSWORD } from "../../constants";
import { loadingState } from "../../atoms";

const { Title, Text } = Typography;

export default function Login() {
  const { login } = useAuth();
  const setIsLoading = useSetRecoilState(loadingState);

  async function onFinish(values) {
    const { emailOrYourPhoneNumber, password } = values;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      login(
        { emailOrYourPhoneNumber, password },
        emailOrYourPhoneNumber + password
      );
    }, 1000);
  }

  function onFinishFailed(errorInfo) {
    // console.log('Failed:', errorInfo)
  }

  function navigateRegister() {}

  return (
    <Fragment>
      <Row>
        <Col
          xs={24}
          sm={{ span: 8, offset: 8 }}
          md={{ span: 12, offset: 6 }}
          lg={{ span: 8, offset: 8 }}
          xl={{ span: 6, offset: 9 }}
        >
          <Row
            style={{
              height: "calc(100vh - 100px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Row
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: "10vh",
              }}
            >
              <FadeIn>
                <Image width={80} src={logo} />
              </FadeIn>
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <Title level={2}>
                <SlideLeft>Family Tree</SlideLeft>
              </Title>
            </Row>
            <Row
              style={{
                justifyContent: "center",
                height: "5vh",
              }}
            >
              <Text>
                {/* {t("src.screens.login.SIWSTGS")} */}
                SIWSTGS
              </Text>
            </Row>
            <Form
              style={{ padding: "0 5vw" }}
              name="normal_login"
              className="login-form"
              initialValues={{
                emailOrYourPhoneNumber: USERNAME,
                password: PASSWORD,
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="emailOrYourPhoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input Email or Your phone number!",
                  },
                ]}
              >
                <Input placeholder="Email or your phone number" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input type="password" placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button type="link" htmlType="submit">
                    {/* {t("src.screens.login.Continue")} */}
                    Continue
                  </Button>
                </div>
              </Form.Item>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Form.Item
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                  name="remember"
                  valuePropName="checked"
                  noStyle
                >
                  <Checkbox>
                    {/* {t("src.screens.login.KMSI")} */}
                    KMSI
                  </Checkbox>
                </Form.Item>
              </div>
            </Form>
          </Row>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: 100,
            }}
          >
            <Button onClick={navigateRegister} type="link">
              {/* {t("src.screens.login.NOS")} */}
              NOS
            </Button>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
}
