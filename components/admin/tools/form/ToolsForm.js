import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// Services
import { fetchTool, updateTool, createTool } from 'services/tools';
import { toastr } from 'react-redux-toastr';

import { STATE_DEFAULT, FORM_ELEMENTS } from 'components/admin/tools/form/constants';

// Components
import Navigation from 'components/form/Navigation';
import Step1 from 'components/admin/tools/form/steps/Step1';
import Spinner from 'components/ui/Spinner';

class ToolsForm extends React.Component {
  static propTypes = {
    authorization: PropTypes.string.isRequired,
    id: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = { id: null };

  state = ({
    ...STATE_DEFAULT,
    id: this.props.id,
    loading: !!this.props.id,
    form: STATE_DEFAULT.form,
    initialForm: STATE_DEFAULT.form,
  });

  componentDidMount() {
    const { authorization } = this.props;
    const { id } = this.state;
    // Get the tools and fill the
    // state form with its params if the id exists
    if (id) {
      fetchTool(id, authorization)
        .then((data) => {
          this.setState({
            form: this.setFormFromParams(data),
            initialForm: this.setFormFromParams(data),
            // Stop the loading
            loading: false,
          });
        })
        .catch((err) => {
          toastr.error('Error', err);
        });
    }
  }

  /**
   * UI EVENTS
   * - onSubmit
   * - onChange
   * - onStepChange
  */
  onSubmit = (event) => {
    const {
      step, submitting, stepLength, form,
    } = this.state;
    const { authorization } = this.props;
    event.preventDefault();

    // Validate the form
    FORM_ELEMENTS.validate(step);

    // Set a timeout due to the setState function of react
    setTimeout(() => {
      // Validate all the inputs on the current step
      const valid = FORM_ELEMENTS.isValid(step);

      if (valid) {
        // if we are in the last step we will submit the form
        if (step === stepLength && !submitting) {
          const { id } = this.state;

          // Start the submitting
          this.setState({ submitting: true });

          // updateTool
          if (id) {
            updateTool(form, authorization)
              .then((data) => {
                toastr.success('Success', `The tool "${data.id}" - "${data.title}" has been updated successfully`);
                this.setState({ initialForm: form });
                if (this.props.onSubmit) this.props.onSubmit();
              })
              .catch((err) => {
                this.setState({ submitting: false });
                toastr.error(`Error updating the tool: ${id}`, err);
              });
          }
          // createTool
          else {
            createTool(form, authorization)
              .then((data) => {
                toastr.success('Success', `The tool "${data.id}" - "${data.title}" has been created successfully`);
                this.setState({ initialForm: form });
                if (this.props.onSubmit) this.props.onSubmit();
              })
              .catch((err) => {
                this.setState({ submitting: false });
                toastr.error('Error creating the tool', err);
              });
          }
        } else {
          this.setState({ step: this.state.step + 1 });
        }
      } else {
        toastr.error('Error', 'Fill all the required fields or correct the invalid values');
      }
    }, 0);
  }

  onChange = (obj) => {
    const form = { ...this.state.form, ...obj };
    this.setState({ form });
  }

  onStepChange = (step) => {
    this.setState({ step });
  }

  // HELPERS
  setFormFromParams(params) {
    const newForm = {};

    Object.keys(params).forEach((f) => {
      switch (f) {
        // TODO: if the API doesn't send it we won't need to handle it
        case 'thumbnail': {
          if (params[f] && params[f].original !== '/images/original/missing.png') {
            newForm[f] = params[f].original;
          }
          break;
        }
        default: {
          if ((typeof params[f] !== 'undefined' || params[f] !== null)
            || (typeof this.state.form[f] !== 'undefined' || this.state.form[f] !== null)) {
            newForm[f] = params[f] || this.state.form[f];
          }
        }
      }
    });

    return newForm;
  }

  render() {
    const {
      form,
      initialForm,
      loading,
      step,
      id,
      stepLength,
      submitting,
    } = this.state;
    return (
      <form
        className={cx({
          'c-form': true,
          '-disabled': initialForm.env && process.env.NEXT_PUBLIC_ENVS_EDIT.split(',').findIndex((d) => d === initialForm.env) < 0,
        })}
        onSubmit={this.onSubmit}
        noValidate
      >
        <Spinner isLoading={loading} className="-light" />

        {(step === 1 && !loading)
          && (
            <Step1
              onChange={(value) => this.onChange(value)}
              form={form}
              id={id}
            />
          )}

        {!loading
          && (
            <Navigation
              step={step}
              stepLength={stepLength}
              submitting={submitting}
              onStepChange={this.onStepChange}
            />
          )}
      </form>
    );
  }
}

export default ToolsForm;
