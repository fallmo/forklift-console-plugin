import React, { useCallback, useReducer } from 'react';
import { Base64 } from 'js-base64';
import { openstackSecretFieldValidator, safeBase64Decode } from 'src/modules/Providers/utils';
import { useForkliftTranslation } from 'src/utils/i18n';

import { FormGroupWithHelpText } from '@kubev2v/common';
import { Button, TextInput } from '@patternfly/react-core';
import EyeIcon from '@patternfly/react-icons/dist/esm/icons/eye-icon';
import EyeSlashIcon from '@patternfly/react-icons/dist/esm/icons/eye-slash-icon';

import { EditComponentProps } from '../../BaseCredentialsSection';

export const ApplicationWithCredentialsIDFormGroup: React.FC<EditComponentProps> = ({
  secret,
  onChange,
}) => {
  const { t } = useForkliftTranslation();

  const applicationCredentialID = safeBase64Decode(secret?.data?.applicationCredentialID);
  const applicationCredentialSecret = safeBase64Decode(secret?.data?.applicationCredentialSecret);
  const regionName = safeBase64Decode(secret?.data?.regionName);
  const projectName = safeBase64Decode(secret?.data?.projectName);

  const initialState = {
    passwordHidden: true,
    validation: {
      applicationCredentialID: openstackSecretFieldValidator(
        'applicationCredentialID',
        applicationCredentialID,
      ),
      applicationCredentialSecret: openstackSecretFieldValidator(
        'applicationCredentialSecret',
        applicationCredentialSecret,
      ),
      regionName: openstackSecretFieldValidator('regionName', regionName),
      projectName: openstackSecretFieldValidator('projectName', projectName),
    },
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_FIELD_VALIDATED':
        return {
          ...state,
          validation: {
            ...state.validation,
            [action.payload.field]: action.payload.validationState,
          },
        };
      case 'TOGGLE_PASSWORD_HIDDEN':
        return { ...state, passwordHidden: !state.passwordHidden };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // Define handleChange and validation functions
  const handleChange = useCallback(
    (id, value) => {
      const validationState = openstackSecretFieldValidator(id, value);
      dispatch({ type: 'SET_FIELD_VALIDATED', payload: { field: id, validationState } });

      const encodedValue = Base64.encode(value?.trim() || '');
      onChange({ ...secret, data: { ...secret.data, [id]: encodedValue } });
    },
    [secret, onChange],
  );

  const togglePasswordHidden = () => {
    dispatch({ type: 'TOGGLE_PASSWORD_HIDDEN' });
  };

  return (
    <>
      <FormGroupWithHelpText
        label={t('Application credential ID')}
        isRequired
        fieldId="applicationCredentialID"
        helperText={state.validation.applicationCredentialID.msg}
        helperTextInvalid={state.validation.applicationCredentialID.msg}
        validated={state.validation.applicationCredentialID.type}
      >
        <TextInput
          spellCheck="false"
          isRequired
          type="text"
          id="applicationCredentialID"
          name="applicationCredentialID"
          value={applicationCredentialID}
          onChange={(value) => handleChange('applicationCredentialID', value)}
          validated={state.validation.applicationCredentialID.type}
        />
      </FormGroupWithHelpText>

      <FormGroupWithHelpText
        label={t('Application credential Secret')}
        isRequired
        fieldId="applicationCredentialSecret"
        helperText={state.validation.applicationCredentialSecret.msg}
        helperTextInvalid={state.validation.applicationCredentialSecret.msg}
        validated={state.validation.applicationCredentialSecret.type}
      >
        <TextInput
          spellCheck="false"
          className="pf-u-w-75"
          isRequired
          type={state.passwordHidden ? 'password' : 'text'}
          id="applicationCredentialSecret"
          name="applicationCredentialSecret"
          value={applicationCredentialSecret}
          onChange={(value) => handleChange('applicationCredentialSecret', value)}
          validated={state.validation.applicationCredentialSecret.type}
        />
        <Button
          variant="control"
          onClick={togglePasswordHidden}
          aria-label={state.passwordHidden ? 'Show password' : 'Hide password'}
        >
          {state.passwordHidden ? <EyeIcon /> : <EyeSlashIcon />}
        </Button>
      </FormGroupWithHelpText>

      <FormGroupWithHelpText
        label={t('Region')}
        isRequired
        fieldId="regionName"
        helperText={state.validation.regionName.msg}
        helperTextInvalid={state.validation.regionName.msg}
        validated={state.validation.regionName.type}
      >
        <TextInput
          spellCheck="false"
          isRequired
          type="text"
          id="regionName"
          name="regionName"
          value={regionName}
          onChange={(value) => handleChange('regionName', value)}
          validated={state.validation.regionName.type}
        />
      </FormGroupWithHelpText>

      <FormGroupWithHelpText
        label={t('Project')}
        isRequired
        fieldId="projectName"
        helperText={state.validation.projectName.msg}
        helperTextInvalid={state.validation.projectName.msg}
        validated={state.validation.projectName.type}
      >
        <TextInput
          spellCheck="false"
          isRequired
          type="text"
          id="projectName"
          name="projectName"
          value={projectName}
          onChange={(value) => handleChange('projectName', value)}
          validated={state.validation.projectName.type}
        />
      </FormGroupWithHelpText>
    </>
  );
};
