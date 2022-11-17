import React, { useState, useImperativeHandle } from "react";
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
  const handleSubmit = methods.handleSubmit((data) => setContactInfos(data));

  useImperativeHandle(ref, () => ({
    submit : async() => {
      const result = await handleSubmit();
      return Object.keys(methods.formState.errors).length,Object.keys(methods.formState.errors)
    },
  }));

  
  
  return (
    <FormProvider {...methods}>
      <form className="form" onSubmit={handleSubmit}>
        <section className={classes.boxField}>
          <label>Nome*</label>
          <Controller
            className={classes.textInput}
            as={TextField}
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
              className={classes.textInput}
              control={methods.control}
              render={({ ref, ...rest }) => (
                <DatePicker
                  disableFuture
                  openTo="year"
                  format="dd/MM/yyyy"
                  views={["year", "month", "date"]}
                  {...rest}
                  outlined
                />
              )}
            />
          </MuiPickersUtilsProvider>
        </section>

        <section>
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
                name="Telephone"
                control={methods.control}
              />
            </section>
            <section className={classes.boxField}>
              <label>Email</label>
              <Controller
                className={classes.textInput}
                as={TextField}
                name="Email"
                control={methods.control}
              />
            </section>
            <section className={classes.boxField}>
              <label>CartaFreccia</label>
              <Controller
                className={classes.textInput}
                as={TextField}
                name="CartaFreccia"
                control={methods.control}
              />
            </section>
          </>
        )}

        <section>
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
                name="BonusCode"
                control={methods.control}
              />
            </section>
            <section className={classes.boxField}>
              <label>Codice antifrode</label>
              <Controller
                className={classes.textInput}
                as={TextField}
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
