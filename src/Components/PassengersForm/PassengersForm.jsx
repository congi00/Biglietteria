import React, { useState, useImperativeHandle } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Switch } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { Controller, FormProvider, useForm } from "react-hook-form";
import { forwardRef } from "react";

const useStyles = makeStyles((theme, props) => {
  return {
    textInput: {
      backgroundColor: "#fff",
      boxSizing: "border-box",
      border: "2px solid #A7A7A7",
    },
    boxField: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "20px",
      "& label": {
        color: "#fff",
        fontSize: "16px",
        marginBottom: "2px",
      },
    },
  };
});

const PassengersForm = forwardRef(({ defaultValues, setContactInfos }, ref) => {
  const classes = useStyles();
  const methods = useForm({ defaultValues });
  const [contactData, setContactData] = useState(false);
  const [giftCard, setGiftCard] = useState(false);
  const handleSubmit = methods.handleSubmit((data) => setContactInfos(data));

  useImperativeHandle(ref, () => ({
    submit() {
      handleSubmit();
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
            name="FisrtName"
            control={methods.control}
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
              rules={{ required: true }}
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

export default PassengersForm;
