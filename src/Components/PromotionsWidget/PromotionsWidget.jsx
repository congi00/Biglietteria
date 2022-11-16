import React from "react";
import useStyles from "./styles.js";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import { getPriceFormat } from "../../utils";
import PropTypes from "prop-types";

const PromotionsWidget = ({
  leg,
  serviceSelected,
  globalServiceSelected,
  promotionsSelection,
  setServiceSelected,
}) => {
  const classes = useStyles();
  const item = serviceSelected?.item;
  const [value, setValue] = React.useState(promotionsSelection[0].description);
  const [sitChoice, setSitChoice] = React.useState(false);

  const handleChangeSwitch = (event) => {
    setSitChoice(event.target.checked);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    promotionsSelection.forEach((promo) => {
      if (event.target.value === promo.description) {
        let serviceUpdate = [...globalServiceSelected];
        serviceUpdate[leg] = {
          ...serviceUpdate[leg],
          item: { ...item, codePromo: promo.code },
        };
        setServiceSelected(serviceUpdate);
      }
    });
  };

  console.log("PromotionsWidget -> render -> serviceSelected", serviceSelected);
  console.log(
    "PromotionsWidget -> render -> promotionsSelection",
    promotionsSelection
  );
  return (
    <>
      <div className={classes.promBox}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5">SERVIZIO {item?.description}</Typography>
          </Grid>
          <Grid item xs={12} style={{ paddingTop: "0" }}>
            <Typography variant="h5">Seleziona l'offerta</Typography>
          </Grid>
        </Grid>
      </div>
      <FormControl style={{ width: "100%" }}>
        <RadioGroup value={value} onChange={handleChange}>
          {promotionsSelection.map((item) => {
            return (
              <Grid
                container
                spacing={3}
                className={classes.itemBox}
                key={"Promo_" + item.code}
                style={{
                  backgroundColor:
                    value === item.description ? "yellow" : "#fff",
                }}
              >
                <Grid item xs={1}>
                  <FormControlLabel
                    value={item.description}
                    control={<Radio />}
                    disabled={!item.availability}
                  />
                </Grid>
                <Grid
                  item
                  xs={8}
                  className={
                    item.availability ? classes.opacityOff : classes.opacityOn
                  }
                >
                  <div className={classes.descriptionItem}>
                    {item.description}
                  </div>
                </Grid>
                <Grid
                  item
                  xs={3}
                  className={
                    item.availability ? classes.opacityOff : classes.opacityOn
                  }
                >
                  <div className={classes.priceItem}>
                    {getPriceFormat(item.price)} €
                  </div>
                </Grid>
              </Grid>
            );
          })}
        </RadioGroup>
        <div className={classes.choiceSit}>
          <Typography variant="h5">Scegli il posto</Typography>
          <Switch
            checked={sitChoice}
            onChange={handleChangeSwitch}
            name="checkedA"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
      </FormControl>
    </>
  );
}

PromotionsWidget.propTypes = {
  leg: PropTypes.number,
  serviceSelected: PropTypes.object,
  globalServiceSelected: PropTypes.array,
  promotionsSelection: PropTypes.array,
  setServiceSelected: PropTypes.func,
};

export default React.memo(PromotionsWidget);
