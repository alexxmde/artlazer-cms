import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { Row, Column } from '../common/responsive';
import { HeadlineMedium } from '../common/headlines';
import { LoginContainer, LogoBox, LoginBox, Header, ButtonRow, Logo, TitleColumn,
  Form } from './styleds';
import InputField from '../common/fields/input';
import SubmitButton from '../common/buttons/submitButton';
import validate from './validate';
import translated from '../common/translated';
import * as actions from '../../actions/authentication';
import { INDEX_ROUTE } from '../app/routeNames';

const logo = require('../../assets/logo.png');

@translated
@reduxForm({
  form: 'login',
  validate,
})
@connect(null, dispatch => ({
  setToken: bindActionCreators(actions.setUserToken, dispatch),
  push: bindActionCreators(push, dispatch),
}))
export default class Login extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    setToken: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.submit = ::this.submit;
    this.state = { error: null };
  }

  async submit(form) {
    const { setToken, push: routerPush } = this.props;
    await setToken(form.toJS());

    routerPush(INDEX_ROUTE);
  }

  render() {
    const { handleSubmit, t } = this.props;
    const { error } = this.state;

    return (
      <LoginContainer>
        <Column xsmall={12} large={4} center>
          <LoginBox>
            <Header>
              <Column center>
                <LogoBox>
                  <Logo src={logo} />
                </LogoBox>
              </Column>
              <TitleColumn center>
                <HeadlineMedium>CMS</HeadlineMedium>
              </TitleColumn>
            </Header>
            <Row>
              <Form onSubmit={handleSubmit(this.submit)}>
                <Field
                  component={InputField}
                  label={t('common.username')}
                  name="username"
                  required
                />
                <Field
                  label={t('common.password')}
                  component={InputField}
                  name="password"
                  required
                />
                <ButtonRow flexEnd>
                  <SubmitButton text={t('common.login')} />
                </ButtonRow>
              </Form>
            </Row>
            {error && <div>{error}</div>}
          </LoginBox>
        </Column>
      </LoginContainer>
    );
  }
}
