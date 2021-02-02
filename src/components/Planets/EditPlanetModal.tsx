import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  InputProps,
} from 'reactstrap';
import { setMessageAction } from '../../actions';
import { getRandomBool, mapByKey } from '../../compositions';
import { TNullable, TObject } from '../../types';

interface IInputProps extends InputProps {
  isRequired: boolean;
  options: string[];
}

const FORM_FIELDS: IInputProps[] = [
  {
    name: 'name',
    placeholder: 'Enter planet name',
    type: 'text',
    isRequired: true,
    options: [],
  },
  {
    name: 'rotation_period',
    placeholder: 'Enter planet rotation period',
    type: 'number',
    isRequired: true,
    options: [],
  },
  {
    name: 'orbital_period',
    placeholder: 'Enter planet orbital period',
    type: 'number',
    isRequired: true,
    options: [],
  },
  {
    name: 'diameter',
    placeholder: 'Enter planet diameter',
    type: 'number',
    isRequired: true,
    options: [],
  },
  {
    name: 'climate',
    placeholder: 'Enter planet climate',
    type: 'text',
    isRequired: true,
    options: [],
  },
  {
    name: 'gravity',
    placeholder: 'Enter planet gravity',
    type: 'text',
    isRequired: true,
    options: [],
  },
  {
    name: 'terrain',
    type: 'select',
    multiple: true,
    isRequired: true,
    options: [
      'tundra',
      'ice caves',
      'mountain ranges',
      'grasslands',
      'mountains',
    ],
  },
  { name: 'surface_water', type: 'text', isRequired: true, options: [] },
];

type TStateArray = {
  name: string;
  isValid: boolean;
};
const stateArray: TStateArray[] = FORM_FIELDS.map(({ name }) => ({
  name: name as string,
  isValid: true,
}));
const initialState = mapByKey<TStateArray>(stateArray, 'name');

interface IFormItem {
  selectedOptions: { value: string }[];
  value: string;
  name: string;
  nodeName: string;
}

interface IEditPlanetModal {
  editingPlanetName: TNullable<string>;
  close: () => void;
  onSave: (key: TNullable<string>, key1: IFormItem) => void;
}

export const getFormValues = (items: IFormItem[]) =>
  items
    .map((item: IFormItem) => {
      const { selectedOptions, value, name, nodeName } = item;

      if (!name) {
        return null;
      }

      return {
        name,
        value:
          nodeName === 'SELECT'
            ? [...selectedOptions].map((item) => item.value).join(', ')
            : value,
      };
    })
    .filter(Boolean);

export default function EditPlanetModal({
  editingPlanetName,
  close,
  onSave,
}: IEditPlanetModal) {
  const [isValid, setIsValid] = useState<TObject<TStateArray>>(initialState);

  const { planets } = useSelector(
    (state: { planets: { planets: TObject<string>[] } }) => state.planets
  );

  const currentPlanet = useMemo(
    () => planets.find(({ name }) => name === editingPlanetName),
    [editingPlanetName, planets]
  );

  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    setIsValid(initialState);
    close();
  }, [close]);

  const handleSave = useCallback(
    (values) => {
      setIsValid(initialState);
      onSave(editingPlanetName, values);
    },
    [editingPlanetName, onSave]
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const { target } = event;

      const isValidValues = [...target]
        .map((item) => {
          const { selectedOptions, value, name, nodeName } = item;
          const isValidField =
            nodeName === 'SELECT' ? selectedOptions.length : value;

          const isValidValue = {
            name: name as string,
            isValid: Boolean(isValidField),
          };

          if (!name) {
            return null;
          }

          return isValidValue;
        })
        .filter(Boolean)
        .reduce(
          (acc: TObject<TStateArray>, item: any) => {
            const { name } = item as TStateArray;
            return {
              ...acc,
              [name]: item,
            };
          },
          { ...isValid }
        );

      setIsValid(isValidValues);

      const isValidForm = !Object.entries(isValidValues)
        .map(([, value]) => value.isValid)
        .includes(false);

      if (!isValidForm) {
        return;
      }

      handleSave(getFormValues([...target]));

      dispatch(
        getRandomBool()
          ? setMessageAction(
              'Correctly added new planet to database',
              'success'
            )
          : setMessageAction('Something went wrong. Try again later', 'danger')
      );
      handleClose();
    },
    [isValid, handleSave, dispatch, handleClose]
  );

  return (
    <div>
      <Modal isOpen={!!editingPlanetName} toggle={handleClose}>
        <Form onSubmit={handleSubmit}>
          <ModalHeader>Modal title</ModalHeader>
          <ModalBody>
            {FORM_FIELDS.map(
              ({ name: fieldName, options, type, multiple = false }) => {
                const name = fieldName as string;
                const currentValue =
                  currentPlanet && (currentPlanet[name] || '');
                return (
                  <FormGroup key={name}>
                    <Label for="exampleEmail">{name}</Label>
                    {options && options.length ? (
                      <Input
                        type={type}
                        name={name}
                        multiple={multiple}
                        invalid={!isValid[name].isValid}
                      >
                        {options.map((option: string) => (
                          <option
                            selected={currentValue?.includes(option)}
                            key={option}
                            value={option}
                          >
                            {option}
                          </option>
                        ))}
                      </Input>
                    ) : (
                      <Input
                        invalid={!isValid[name].isValid}
                        type={type}
                        name={name}
                        defaultValue={currentValue}
                      />
                    )}
                  </FormGroup>
                );
              }
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Submit</Button>
            <Button color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}
