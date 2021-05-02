import React, { Dispatch, SetStateAction, useState } from "react";
import Button from "@material-ui/core/Button";
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

// Date/TimePicker imports
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import enLocale from "date-fns/locale/en-US";
import frLocale from "date-fns/locale/fr";

import { MicroBarrierFields } from "./MicroBarrierController";
import FormTitle from "../FormTitle";
import Colors from "../../../Colors";
import {
    ChoiceItem,
    MicroBarrierEnvironmentalSubtype,
    MicroBarrierInfrastructureCrossingSubtype,
    MicroBarrierInfrastructureIntersectionSubtype,
    MicroBarrierInfrastructureSidewalkType,
    MicroBarrierInfrastructureSubtype,
    MicroBarrierObstructionFixedSubtype,
    MicroBarrierObstructionSubtype,
    MicroBarrierObstructionTransientSubtype,
    MicroBarrierType } from "../../../FormTypes";

interface MicroBarrierFormProps {
    formData: MicroBarrierFields;
    setFormData: Dispatch<SetStateAction<any>>,
    nextStep: () => void,
    prevStep: () => void;
    cancel: () => void,
}

const minInputHeight = 56;

const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: theme.spacing(3),
    },
    buttonBar: {
        marginTop: theme.spacing(2),
        textAlign: "right",
    },
    buttonBarButton: {
        minWidth: 90,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(3),
    },
    cancelButton: {
        borderColor: Colors.contrastRed,
        color: Colors.contrastRed,
        minWidth: 90,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(3),
        '&:hover': {
            borderColor: Colors.contrastRed
        },
    },
    date: {
        marginTop: theme.spacing(1),
        minHeight: minInputHeight,
    },
    input: {
        marginTop: theme.spacing(1),
    },
    listItem: {
        marginLeft: theme.spacing(3),
    },
    listSubHeader: {
        color: theme.palette.primary.main,
        fontSize: 16,
        fontWeight: 600
    },
    menuItem: {
        minHeight: minInputHeight,
        '&.Mui-selected': {
            borderLeft: `6px solid ${Colors.contrast}`
        }
    },
    option: {
        marginLeft: theme.spacing(1),
    },
    question: {
        marginTop: theme.spacing(4),
    },
    subMenuItem: {
        minHeight: minInputHeight,
        '&.Mui-selected': {
            borderLeft: `6px solid ${Colors.contrast}`
        }
    },
}));

const MicroBarrierForm = (props: MicroBarrierFormProps) => {
    const { cancel, formData, nextStep, prevStep, setFormData  } = { ...props };
    const { t } = useTranslation();

    const validationSchema = Yup.object({
        date: Yup
            .date()
            .required(t("form-required")),
        microBarrierSubtype: Yup
            .string()
            .required(t("form-required")),
        microBarrierSubtypeDetail: Yup
            .string()
            .required(t("form-required")),
        microBarrierSubtypeDetailOpen: Yup
            .string(),
        microBarrierType: Yup
            .string()
            .required(t("form-required")),
    });

    const formik = useFormik({
        initialValues: { ...formData },
        onSubmit: (values) => {
            setFormData(values);
            nextStep();
        },
        validationSchema: validationSchema
    });
    const classes = useStyles();
    const microBarrierTypes: ChoiceItem[] = [
        { key: MicroBarrierType.Infrastructure, value: t("form_mb-type-infrastructure") },
        { key: MicroBarrierType.Obstruction, value: t("form_mb-type-obstruction") },
        { key: MicroBarrierType.Environmental, value: t("form_mb-type-environmental") },
    ];

    const microBarrierEnvironmentalSubtypes: ChoiceItem[] = [
        { key: MicroBarrierEnvironmentalSubtype.Snow, value: t("form_mb-environmental-snow") },
        { key: MicroBarrierEnvironmentalSubtype.Ice, value: t("form_mb-environmental-ice") },
        { key: MicroBarrierEnvironmentalSubtype.Puddles, value: t("form_mb-environmental-puddles") },
        { key: MicroBarrierEnvironmentalSubtype.Vegetation, value: t("form_mb-environmental-vegetation") },
        { key: MicroBarrierEnvironmentalSubtype.Other, value: t("form_mb-environmental-other") },
    ];

    const microBarrierInfrastructureCrossingSubtypes: ChoiceItem[] = [
        { key: MicroBarrierInfrastructureCrossingSubtype.Missing, value: t("form_mb-infrastructure-crossing-crosswalk-missing") },
        { key: MicroBarrierInfrastructureCrossingSubtype.DangerousDrivers, value: t("form_mb-infrastructure-crossing-dangerous-drivers") },
        { key: MicroBarrierInfrastructureCrossingSubtype.DangerousVolume, value: t("form_mb-infrastructure-crossing-dangerous-traffic-volume") },
        { key: MicroBarrierInfrastructureCrossingSubtype.DangerousSpeed, value: t("form_mb-infrastructure-crossing-dangerous-traffic-speed") },
        { key: MicroBarrierInfrastructureCrossingSubtype.DangerousVisibility, value: t("form_mb-infrastructure-crossing-dangerous-pedestrian-visibility") },
        { key: MicroBarrierInfrastructureCrossingSubtype.WaitTime, value: t("form_mb-infrastructure-crossing-waiting-time-too-long") },
        { key: MicroBarrierInfrastructureCrossingSubtype.Other, value: t("form_mb-infrastructure-crossing-other") },
    ];

    const microBarrierInfrastructureIntersectionSubtypes: ChoiceItem[] = [
        { key: MicroBarrierInfrastructureIntersectionSubtype.CurbCutMissing, value: t("form_mb-infrastructure-intersection-curb-cut-missing") },
        { key: MicroBarrierInfrastructureIntersectionSubtype.CurbCutDesign, value: t("form_mb-infrastructure-intersection-curb-cut-design") },
        { key: MicroBarrierInfrastructureIntersectionSubtype.TrafficShortSignal, value: t("form_mb-infrastructure-intersection-traffic-signal-too-short") },
        { key: MicroBarrierInfrastructureIntersectionSubtype.TrafficSignalNotAudible, value: t("form_mb-infrastructure-intersection-traffic-signal-not-audible") },
        { key: MicroBarrierInfrastructureIntersectionSubtype.TrafficSignalButtonAccess, value: t("form_mb-infrastructure-intersection-traffic-signal-button-access") },
        { key: MicroBarrierInfrastructureIntersectionSubtype.VehicleConflictLeft, value: t("form_mb-infrastructure-intersection-vehicle-left-turn") },
        { key: MicroBarrierInfrastructureIntersectionSubtype.VehicleConflictRight, value: t("form_mb-infrastructure-intersection-vehicle-right-turn") },
        { key: MicroBarrierInfrastructureIntersectionSubtype.VehicleConflictRightRed, value: t("form_mb-infrastructure-intersection-vehicle-right-turn-red") },
        { key: MicroBarrierInfrastructureIntersectionSubtype.Visibility, value: t("form_mb-infrastructure-intersection-poor-visiblity") },
        { key: MicroBarrierInfrastructureIntersectionSubtype.Other, value: t("form_mb-infrastructure-intersection-other") },
    ];

    const microBarrierInfrastructureSubtypes: ChoiceItem[] = [
        { key: MicroBarrierInfrastructureSubtype.Sidewalk, value: t("form_mb-infrastructure-sidewalk") },
        { key: MicroBarrierInfrastructureSubtype.Crossing, value: t("form_mb-infrastructure-crossing") },
        { key: MicroBarrierInfrastructureSubtype.Intersection, value: t("form_mb-infrastructure-intersection") },
    ];

    const microBarrierInfrastructureSidewalkTypes: ChoiceItem[] = [
        { key: MicroBarrierInfrastructureSidewalkType.Narrow, value: t("form_mb-infrastructure-sidewalk-narrow") },
        { key: MicroBarrierInfrastructureSidewalkType.TripRoots, value: t("form_mb-infrastructure-sidewalk-buckling-pavement") },
        { key: MicroBarrierInfrastructureSidewalkType.TripUneven, value: t("form_mb-infrastructure-sidewalk-uneven-blocks") },
        { key: MicroBarrierInfrastructureSidewalkType.TripHolesCracks, value: t("form_mb-infrastructure-sidewalk-holes-cracks") },
        { key: MicroBarrierInfrastructureSidewalkType.Uncomfortable, value: t("form_mb-infrastructure-sidewalk-uncomfortable-surface") },
        { key: MicroBarrierInfrastructureSidewalkType.Driveway, value: t("form_mb-infrastructure-sidewalk-driveway-slope") },
        { key: MicroBarrierInfrastructureSidewalkType.Other, value: t("form_mb-infrastructure-sidewalk-other") },
    ];

    const microBarrierObstructionSubtypes: ChoiceItem[] = [
        { key: MicroBarrierObstructionSubtype.Fixed, value: t("form_mb-obstruction-fixed") },
        { key: MicroBarrierObstructionSubtype.Transient, value: t("form_mb-obstruction-transient") },
    ];

    const microBarrierObstructionFixedSubtypes: ChoiceItem[] = [
        { key: MicroBarrierObstructionFixedSubtype.Bollard, value: t("form_mb-obstruction-fixed-bollard") },
        { key: MicroBarrierObstructionFixedSubtype.Pole, value: t("form_mb-obstruction-fixed-pole") },
        { key: MicroBarrierObstructionFixedSubtype.Mailbox, value: t("form_mb-obstruction-fixed-mailbox") },
        { key: MicroBarrierObstructionFixedSubtype.BikeRack, value: t("form_mb-obstruction-fixed-bike-rack") },
        { key: MicroBarrierObstructionFixedSubtype.BusShelter, value: t("form_mb-obstruction-fixed-bus-shelter") },
        { key: MicroBarrierObstructionFixedSubtype.Other, value: t("form_mb-obstruction-fixed-other") },
    ];

    const microBarrierObstructionTransientSubtypes: ChoiceItem[] = [
        { key: MicroBarrierObstructionTransientSubtype.Sandwich, value: t("form_mb-obstruction-transient-sandwich") },
        { key: MicroBarrierObstructionTransientSubtype.BicycleParking, value: t("form_mb-obstruction-transient-bicycle-parking") },
        { key: MicroBarrierObstructionTransientSubtype.Trash, value: t("form_mb-obstruction-transient-trash") },
        { key: MicroBarrierObstructionTransientSubtype.Vehicle, value: t("form_mb-obstruction-transient-vehicle") },
        { key: MicroBarrierObstructionTransientSubtype.ConstructionUnsafe, value: t("form_mb-obstruction-transient-construction-unsafe") },
        { key: MicroBarrierObstructionTransientSubtype.ConstructionSigns, value: t("form_mb-obstruction-transient-construction-signs") },
        { key: MicroBarrierObstructionTransientSubtype.Other, value: t("form_mb-obstruction-transient-other") },
    ];

    const handleDateChange = (value: any) => {
        formik.setFieldValue("date", value);
    };

    const handleMicroBarrierSubtypeDetailOpen = (event: any) => {
        formik.setFieldValue("microBarrierSubtypeDetailOpen", event.target.value);
    };

    const handleMicroBarrierSubtypeDetailSelect = (event: any) => {
        // We never want an undefined value, so set to an empty string instead
        const value = event.target.value || "";
        if (value !== formik.values.microBarrierSubtypeDetail) {
            formik.setFieldValue("microBarrierSubtypeDetailOpen", "");
        }

        formik.setFieldValue("microBarrierSubtypeDetail", value || "");
    };

    const handleMicroBarrierSubtypeSelect = (event: any) => {
        // We never want an undefined value, so set to an empty string instead
        const value = event.target.value || "";
        if (value !== formik.values.microBarrierSubtype) {
            formik.setFieldValue("microBarrierSubtypeDetail", "" );
            formik.setFieldValue("microBarrierSubtypeDetailOpen", "");
        }

        formik.setFieldValue("microBarrierSubtype", value);

        // Special case where there is no subtype detail for obstructions. 
        // We have validation on the microBarrierSubtypeDetail field, so
        // we have to set a value here.
        if (formik.values.microBarrierType === MicroBarrierType.Obstruction) {
                formik.setFieldValue("microBarrierSubtypeDetail", value);
        }
    };

    const handleMicroBarrierTypeSelect = (event: any) => {
        if (event.target.value !== formik.values.microBarrierType) {
            formik.setFieldValue("microBarrierSubtype", "");
            formik.setFieldValue("microBarrierSubtypeDetail", "");
            formik.setFieldValue("microBarrierSubtypeDetailOpen", "" );
        }

        formik.setFieldValue("microBarrierType", event.target.value);
    };

    const handlePreviousClick = () => {
        setFormData(formData);
        prevStep();
    };

    const renderCrossingSubtypes = () => {
        const items = [];

        items.push(<MenuItem className={classes.menuItem} key={microBarrierInfrastructureCrossingSubtypes[0].key} value={microBarrierInfrastructureCrossingSubtypes[0].key}>
            <Typography>
                {microBarrierInfrastructureCrossingSubtypes[0].value}
            </Typography>
        </MenuItem>);

        items.push(<ListSubheader className={classes.listSubHeader} key="crosswalk-danger">{t("form_mb-infrastructure-dangerous-crosswalk")}</ListSubheader>);

        for (let i = 1; i < 5; i++ ) {
            // eslint-disable-next-line
            // @ts-ignore
            items.push(
                <MenuItem className={classes.menuItem} key={microBarrierInfrastructureCrossingSubtypes[i].key} value={microBarrierInfrastructureCrossingSubtypes[i].key}>
                <Typography className={classes.listItem}>
                    {microBarrierInfrastructureCrossingSubtypes[i].value}
                </Typography>
            </MenuItem>
            );
        }

        items.push(<MenuItem className={classes.menuItem} key={microBarrierInfrastructureCrossingSubtypes[5].key} value={microBarrierInfrastructureCrossingSubtypes[5].key}>
            <Typography>
                {microBarrierInfrastructureCrossingSubtypes[5].value}
            </Typography>
        </MenuItem>);
        
        items.push(<MenuItem className={classes.menuItem} key={microBarrierInfrastructureCrossingSubtypes[6].key} value={microBarrierInfrastructureCrossingSubtypes[6].key}>
            <Typography>
                {microBarrierInfrastructureCrossingSubtypes[6].value}
            </Typography>
        </MenuItem>);

        return items;
    }

    return (
        <MuiPickersUtilsProvider locale={enLocale} utils={DateFnsUtils}>
            <FormTitle title="form_micro-barrier" />
            <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                <div className={classes.question}>
                    <Typography>
                        {t("form_mb-type-question")}
                    </Typography>
                    <TextField
                        className={classes.input}
                        fullWidth
                        id="micro-barrier-type"
                        name="micro-barrier-type"
                        select
                        value={formik.values.microBarrierType}
                        onChange={handleMicroBarrierTypeSelect}
                        error={formik.touched.microBarrierType && Boolean(formik.errors.microBarrierType)}
                        helperText={formik.touched.microBarrierType && formik.errors.microBarrierType}
                        variant="outlined"
                    >
                        {
                            microBarrierTypes.map((item) => {
                                return (
                                    <MenuItem className={classes.menuItem} key={item.key} value={item.key}>
                                        <Typography>
                                            {item.value}
                                        </Typography>
                                    </MenuItem>
                                )
                            })
                        }
                    </TextField>
                </div>
                {formik.values.microBarrierType === MicroBarrierType.Environmental && (
                    <div className={classes.question}>
                        <Typography>
                            {t("form_mb-environmental-question")}
                        </Typography>
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="micro-barrier-environmental-type"
                            name="micro-barrier-environmental-type"
                            select
                            value={formik.values.microBarrierSubtype}
                            onChange={handleMicroBarrierSubtypeSelect}
                            error={formik.touched.microBarrierSubtype && Boolean(formik.errors.microBarrierSubtype)}
                            helperText={formik.touched.microBarrierSubtype && formik.errors.microBarrierSubtype}
                            variant="outlined"
                        >
                            {
                                microBarrierEnvironmentalSubtypes.map((item) => {
                                    return (
                                        <MenuItem className={classes.menuItem} key={item.key} value={item.key}>
                                            <Typography>
                                                {item.value}
                                            </Typography>
                                        </MenuItem>
                                    )
                                })
                            }
                        </TextField>
                    </div>
                )}
                { formik.values.microBarrierType === MicroBarrierType.Environmental
                    && formik.values.microBarrierSubtype === MicroBarrierEnvironmentalSubtype.Other
                    && (
                    <div className={classes.question}>
                        <Typography>
                            {t("form_mb-environmental-question-other")}
                        </Typography>
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="micro-barrier-environmental-other"
                            name="micro-barrier-environmental-other"
                            value={formik.values.microBarrierSubtypeDetailOpen}
                            onChange={handleMicroBarrierSubtypeDetailOpen}
                            error={formik.touched.microBarrierSubtypeDetailOpen && Boolean(formik.errors.microBarrierSubtypeDetailOpen)}
                            helperText={formik.touched.microBarrierSubtypeDetailOpen && formik.errors.microBarrierSubtypeDetailOpen}
                            variant="outlined"
                        />
                    </div>
                )}
                {formik.values.microBarrierType === MicroBarrierType.Infrastructure && (
                    <div className={classes.question}>
                        <Typography>
                            {t("form_mb-infrastructure-question")}
                        </Typography>
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="micro-barrier-infrastructure-type"
                            name="micro-barrier-infrastructure-type"
                            select
                            value={formik.values.microBarrierSubtype}
                            onChange={handleMicroBarrierSubtypeSelect}
                            error={formik.touched.microBarrierSubtype && Boolean(formik.errors.microBarrierSubtype)}
                            helperText={formik.touched.microBarrierSubtype && formik.errors.microBarrierSubtype}
                            variant="outlined"
                        >
                            {
                                microBarrierInfrastructureSubtypes.map((item) => {
                                    return (
                                        <MenuItem className={classes.menuItem} key={item.key} value={item.key}>
                                            <Typography>
                                                {item.value}
                                            </Typography>
                                        </MenuItem>
                                    )
                                })
                            }
                        </TextField>
                    </div>
                )}
                {formik.values.microBarrierType === MicroBarrierType.Infrastructure
                    && formik.values.microBarrierSubtype === MicroBarrierInfrastructureSubtype.Sidewalk
                    && (
                    <div className={classes.question}>
                        <Typography>
                            {t("form_mb-infrastructure-question-sidewalk")}
                        </Typography>
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="micro-barrier-infrastructure-sidewalk-detail"
                            name="micro-barrier-infrastructure-sidewalk-detail"
                            select
                            value={formik.values.microBarrierSubtypeDetail}
                            onChange={handleMicroBarrierSubtypeDetailSelect}
                            error={formik.touched.microBarrierSubtypeDetail && Boolean(formik.errors.microBarrierSubtypeDetail)}
                            helperText={formik.touched.microBarrierSubtypeDetail && formik.errors.microBarrierSubtypeDetail}
                            variant="outlined"
                        >
                            {
                                microBarrierInfrastructureSidewalkTypes.map((item) => {
                                    return (
                                        <MenuItem className={classes.menuItem} key={item.key} value={item.key}>
                                            <Typography>
                                                {item.value}
                                            </Typography>
                                        </MenuItem>
                                    )
                                })
                            }
                        </TextField>
                    </div>
                )}
                { formik.values.microBarrierType === MicroBarrierType.Infrastructure
                    && formik.values.microBarrierSubtype === MicroBarrierInfrastructureSubtype.Sidewalk
                    && formik.values.microBarrierSubtypeDetail === MicroBarrierInfrastructureSidewalkType.Other
                    && (
                    <div className={classes.question}>
                    <Typography>
                        {t("form_mb-infrastructure-question-sidewalk-other")}
                    </Typography>
                    <TextField
                        className={classes.input}
                        fullWidth
                        id="micro-barrier-infrastructure-sidewalk-other"
                        name="micro-barrier-infrastructure-sidewalk-other"
                        value={formik.values.microBarrierSubtypeDetailOpen}
                        onChange={handleMicroBarrierSubtypeDetailOpen}
                        error={formik.touched.microBarrierSubtypeDetailOpen && Boolean(formik.errors.microBarrierSubtypeDetailOpen)}
                        helperText={formik.touched.microBarrierSubtypeDetailOpen && formik.errors.microBarrierSubtypeDetailOpen}
                        variant="outlined"
                    />
                </div>
                )}
                {formik.values.microBarrierType === MicroBarrierType.Infrastructure
                    && formik.values.microBarrierSubtype === MicroBarrierInfrastructureSubtype.Crossing
                    && (
                    <div className={classes.question}>
                        <Typography>
                            {t("form_mb-infrastructure-question-crossing")}
                        </Typography>
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="micro-barrier-infrastructure-crossing-detail"
                            name="micro-barrier-infrastructure-crossing-detail"
                            select
                            value={formik.values.microBarrierSubtypeDetail}
                            onChange={handleMicroBarrierSubtypeDetailSelect}
                            error={formik.touched.microBarrierSubtypeDetail && Boolean(formik.errors.microBarrierSubtypeDetail)}
                            helperText={formik.touched.microBarrierSubtypeDetail && formik.errors.microBarrierSubtypeDetail}
                            variant="outlined"
                        >
                            {
                                renderCrossingSubtypes()
                            }
                        </TextField>
                    </div>
                )}
                { formik.values.microBarrierType === MicroBarrierType.Infrastructure
                    && formik.values.microBarrierSubtype === MicroBarrierInfrastructureSubtype.Crossing
                    && formik.values.microBarrierSubtypeDetail === MicroBarrierInfrastructureCrossingSubtype.Other
                    && (
                    <div className={classes.question}>
                        <Typography>
                            {t("form_mb-infrastructure-question-crossing-other")}
                        </Typography>
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="micro-barrier-infrastructure-crossing-other"
                            name="micro-barrier-infrastructure-crossing-other"
                            value={formik.values.microBarrierSubtypeDetailOpen}
                            onChange={handleMicroBarrierSubtypeDetailOpen}
                            error={formik.touched.microBarrierSubtypeDetailOpen && Boolean(formik.errors.microBarrierSubtypeDetailOpen)}
                            helperText={formik.touched.microBarrierSubtypeDetailOpen && formik.errors.microBarrierSubtypeDetailOpen}
                            variant="outlined"
                        />
                    </div>
                )}
                {formik.values.microBarrierType === MicroBarrierType.Infrastructure
                    && formik.values.microBarrierSubtype === MicroBarrierInfrastructureSubtype.Intersection
                    && (
                    <div className={classes.question}>
                        <Typography>
                            {t("form_mb-infrastructure-question-intersection")}
                        </Typography>
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="micro-barrier-infrastructure-intersection-detail"
                            name="micro-barrier-infrastructure-intersection-detail"
                            select
                            value={formik.values.microBarrierSubtypeDetail}
                            onChange={handleMicroBarrierSubtypeDetailSelect}
                            error={formik.touched.microBarrierSubtypeDetail && Boolean(formik.errors.microBarrierSubtypeDetail)}
                            helperText={formik.touched.microBarrierSubtypeDetail && formik.errors.microBarrierSubtypeDetail}
                            variant="outlined"
                        >
                            {
                                microBarrierInfrastructureIntersectionSubtypes.map((item) => {
                                    return (
                                        <MenuItem className={classes.menuItem} key={item.key} value={item.key}>
                                            <Typography>
                                                {item.value}
                                            </Typography>
                                        </MenuItem>
                                    )
                                })
                            }
                        </TextField>
                    </div>
                )}
                { formik.values.microBarrierType === MicroBarrierType.Infrastructure
                    && formik.values.microBarrierSubtype === MicroBarrierInfrastructureSubtype.Intersection
                    && formik.values.microBarrierSubtypeDetail === MicroBarrierInfrastructureIntersectionSubtype.Other
                    && (
                    <div className={classes.question}>
                        <Typography>
                            {t("form_mb-infrastructure-question-intersection-other")}
                        </Typography>
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="micro-barrier-infrastructure-intersection-other"
                            name="micro-barrier-infrastructure-intersection-other"
                            value={formik.values.microBarrierSubtypeDetailOpen}
                            onChange={handleMicroBarrierSubtypeDetailOpen}
                            error={formik.touched.microBarrierSubtypeDetailOpen && Boolean(formik.errors.microBarrierSubtypeDetailOpen)}
                            helperText={formik.touched.microBarrierSubtypeDetailOpen && formik.errors.microBarrierSubtypeDetailOpen}
                            variant="outlined"
                        />
                    </div>
                )}
                {formik.values.microBarrierType === MicroBarrierType.Obstruction && (
                    <div className={classes.question}>
                        <Typography>
                            {t("form_mb-obstruction-subtype-detail-question")}
                        </Typography>
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="micro-barrier-obstruction-detail"
                            name="micro-barrier-obstruction-detail"
                            select
                            value={formik.values.microBarrierSubtype}
                            onChange={handleMicroBarrierSubtypeSelect}
                            error={formik.touched.microBarrierSubtype && Boolean(formik.errors.microBarrierSubtype)}
                            helperText={formik.touched.microBarrierSubtype && formik.errors.microBarrierSubtype}
                            variant="outlined"
                        >
                            <ListSubheader className={classes.listSubHeader} key="fixed-obstruction">{t("form_mb-obstruction-fixed")}</ListSubheader>
                            {microBarrierObstructionFixedSubtypes.map((item) => {
                                return (
                                    <MenuItem className={classes.menuItem} key={item.key} value={item.key}>
                                        <Typography className={classes.listItem}>
                                            {item.value}
                                        </Typography>
                                    </MenuItem>
                                )
                            })}
                            <ListSubheader className={classes.listSubHeader} key="transient-obstruction">{t("form_mb-obstruction-transient")}</ListSubheader>
                            {microBarrierObstructionTransientSubtypes.map((item) => {
                                return (
                                    <MenuItem className={classes.menuItem} key={item.key} value={item.key}>
                                        <Typography className={classes.listItem}>
                                            {item.value}
                                        </Typography>
                                    </MenuItem>
                                )
                            })}  
                        </TextField>
                    </div>
                )}              
                { formik.values.microBarrierType === MicroBarrierType.Obstruction
                    && (formik.values.microBarrierSubtype === MicroBarrierObstructionFixedSubtype.Other
                    || formik.values.microBarrierSubtypeDetail === MicroBarrierObstructionTransientSubtype.Other)
                    && (
                    <div className={classes.question}>
                        <Typography>
                            {t("form_mb-obstruction-question-other")}
                        </Typography>
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="micro-barrier-obstruction-other"
                            name="micro-barrier-obstruction-other"
                            value={formik.values.microBarrierSubtypeDetailOpen}
                            onChange={handleMicroBarrierSubtypeDetailOpen}
                            error={formik.touched.microBarrierSubtypeDetailOpen && Boolean(formik.errors.microBarrierSubtypeDetailOpen)}
                            helperText={formik.touched.microBarrierSubtypeDetailOpen && formik.errors.microBarrierSubtypeDetailOpen}
                            variant="outlined"
                        />
                    </div>
                )}
                <div className={classes.question}>
                    <Typography>
                        {t("form_mb-date-question")}
                    </Typography>
                    <KeyboardDatePicker
                        className={classes.date}
                        disableFuture
                        format="MM/dd/yyyy"
                        fullWidth
                        id="amenity-date-picker"
                        inputVariant="outlined"
                        name="amenity-date-picker"
                        onChange={handleDateChange}
                        value={formik.values.date}
                        variant="inline"
                    />
                </div>
                <div className={classes.buttonBar}>
                    <Button
                        className={classes.cancelButton}
                        color="secondary"
                        onClick={cancel}
                        variant="outlined">
                        {t("form_cancel")}
                    </Button>
                    <Button
                        className={classes.buttonBarButton}
                        color="primary"
                        onClick={handlePreviousClick}
                        variant="outlined">
                        {t("form_previous")}
                    </Button>
                    <Button
                        className={classes.buttonBarButton}
                        color="primary"
                        type="submit"
                        variant="contained">
                        {t("form_next")}
                    </Button>
                </div>
            </form>
        </MuiPickersUtilsProvider>
    );
};

export default MicroBarrierForm;