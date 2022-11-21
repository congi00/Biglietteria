import React, { useState, useImperativeHandle, useEffect } from "react";
import useStyles from "./styles.js";
import PropTypes from "prop-types";
import { TextField, Switch } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { Controller, FormProvider, useForm } from "react-hook-form";
import { forwardRef } from "react";


const PassengersForm = forwardRef(({ defaultValues, setContactInfos }, ref) => {
  const classes = useStyles();
  const methods = useForm({ defaultValues });
  const [contactData, setContactData] = useState(false);
  const [giftCard, setGiftCard] = useState(false);
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(true);
  const handleSubmit = methods.handleSubmit((data) => setContactInfos(data));

  useImperativeHandle(ref, () => ({
    submit : async() => {
      const result = await handleSubmit();
      Object.keys(methods.formState.errors).length === 0  ? setSubmitSuccessful(true) : setSubmitSuccessful(false)
      return Object.keys(methods.formState.errors)
    },
    reset(){
      methods.reset({FirstName: "",
      LastName: "",
      BirthDate: null,})
    }
  }));
  
  return (
    <FormProvider {...methods}>
      <form className="form" onSubmit={handleSubmit}>
        <section className={classes.boxField}>
          <label>Nome*</label>
          <Controller
            className={classes.textInput}
            as={TextField}
            placeholder="Inserisci il nome"
            name="FirstName"
            control={methods.control}
            rules={{ required: true }}
          />
        </section>
        <section className={classes.boxField}>
          <label>Cognome*</label>
          <Controller
            className={classes.textInput}
            as={TextField}
            placeholder="Inserisci il cognome"
            name="LastName"
            control={methods.control}
            rules={{ required: true }}
          />
        </section>
        <section className={classes.boxField}>
          <label>Data di nascita</label>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Controller
              name="BirthDate"
              control={methods.control}
              render={({ ref, ...rest }) => (
                <DatePicker
                  disableFuture
                  className={classes.dateField}
                  openTo="year"
                  placeholder="GG/MM/AAAA"
                  inputVariant="outlined"
                  views={["year", "month", "date"]}
                  {...rest}
                />
              )}
            />
          </MuiPickersUtilsProvider>
        </section>

        <section style={{textAlign: "right"}}>
          <label>Il cliente vuole fornire i propri dati di contatto?</label>
          <Controller
            name="contactData"
            control={methods.control}
            render={(props) => (
              <Switch
                onChange={(e) => {
                  setContactData(!contactData);
                  props.onChange(e.target.checked);
                }}
                checked={contactData}
              />
            )}
          />
        </section>
        {contactData && (
          <>
            <section className={classes.boxField}>
              <label>Numero di telefono</label>
              <Controller
                className={classes.textInput}
                as={TextField}
                placeholder="Inserisci il numero di telefono"
                name="Telephone"
                control={methods.control}
              />
            </section>
            <section className={classes.boxField}>
              <label>Email</label>
              <Controller
                className={classes.textInput}
                as={TextField}
                placeholder="Inserisci l'email"
                name="Email"
                control={methods.control}
              />
            </section>
            <section className={classes.boxField}>
              <label>CartaFreccia</label>
              <Controller
                className={classes.textInput}
                as={TextField}
                placeholder="Inserisci il numero della CartaFreccia"
                name="CartaFreccia"
                control={methods.control}
              />
            </section>
          </>
        )}

        <section style={{textAlign: "right"}}>
          <label>Il cliente ha un bonus/credito o una Carta Regalo?</label>
          <Controller
            name="contactData"
            control={methods.control}
            render={(props) => (
              <Switch
                onChange={(e) => {
                  props.onChange(e.target.checked);
                  setGiftCard(!giftCard);
                }}
                checked={giftCard}
              />
            )}
          />
        </section>
        {giftCard && (
          <>
            <section className={classes.boxField}>
              <label>Codice identificativo</label>
              <Controller
                className={classes.textInput}
                as={TextField}
                placeholder="Inserisci il codice identificativo"
                name="BonusCode"
                control={methods.control}
              />
            </section>
            <section className={classes.boxField}>
              <label>Codice antifrode</label>
              <Controller
                className={classes.textInput}
                as={TextField}
                placeholder="Inserisci il codice antifrode"
                name="TrustCode"
                control={methods.control}
              />
            </section>
          </>
        )}
      </form>
    </FormProvider>
  );
});

PassengersForm.propTypes = {
  defaultValues: PropTypes.object, 
  setContactInfos: PropTypes.func,
};

export default PassengersForm;
