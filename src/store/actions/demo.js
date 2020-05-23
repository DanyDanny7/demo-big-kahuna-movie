import axios from 'axios';
import _ from 'lodash';

import {
	GET_ORGANIZATIONS_PENDING,
	GET_ORGANIZATIONS_FULFILLED,
	GET_ORGANIZATIONS_REJECTED,
	POST_ORGANIZATION_FULFILLED,
	POST_ORGANIZATION_PENDING,
	POST_ORGANIZATION_REJECTED,
	DELETE_ORGANIZATION_FULFILLED,
	DELETE_ORGANIZATION_REJECTED,
	UPDATE_ORGANIZATION_FULFILLED,
	UPDATE_ORGANIZATION_REJECTED,
	UPDATE_ORGANIZATION_PENDING,
} from '../actionTypes';

export const getOrganizationsPending = () => ({
	type: GET_ORGANIZATIONS_PENDING,
});

export const getOrganizationsFulfilled = (payload) => ({
	type: GET_ORGANIZATIONS_FULFILLED,
	payload,
});

export const getOrganizationsRejected = (payload) => ({
	type: GET_ORGANIZATIONS_REJECTED,
	payload,
});

const postOrganizationFulfilled = (newOrganization) => ({
	type: POST_ORGANIZATION_FULFILLED,
	payload: newOrganization,
});

const postOrganizationPending = () => ({
	type: POST_ORGANIZATION_PENDING,
});

const postOrganizationRejected = (error) => ({
	type: POST_ORGANIZATION_REJECTED,
	payload: error,
});

const deleteOrganizationFulfilled = (payload) => ({
	type: DELETE_ORGANIZATION_FULFILLED,
	payload,
});

const deleteOrganizationRejected = (error) => ({
	type: DELETE_ORGANIZATION_REJECTED,
	payload: error,
});

const updateOrganizationFulfilled = (updateOrganization) => ({
	type: UPDATE_ORGANIZATION_FULFILLED,
	payload: updateOrganization,
});

const updateOrganizationPending = () => ({
	type: UPDATE_ORGANIZATION_PENDING,
});

const updateOrganizationRejected = (error) => ({
	type: UPDATE_ORGANIZATION_REJECTED,
	payload: error,
});

export const getOrganizations = () => async (dispatch, getState) => {
	const { isPending, isFulfilled } = getState().organizations.status.get;
	if (!isPending && !isFulfilled) {
		dispatch(getOrganizationsPending());
		try {
			const response = await axios.get('/organizaciones');
			const payload = _.keyBy(response.data, 'id');
			dispatch(getOrganizationsFulfilled(payload));

			return Promise.resolve(payload);
		} catch (error) {
			dispatch(getOrganizationsRejected(error));
		}
	}
	return Promise.resolve();
};

export const postOrganization = ({
	nombre,
	siglas,
	municipio,
	latlng,
	direccion,
	telefono,
	email,
	url,
	facebook,
	twitter,
	naturaleza,
	procesoAdminsion,
	lugaresProcedencia,
	areasTrabajos,
	servicio,
	principalesProblemas,
	inscritaConna,
	ultimoAnioResponabilidadSocial,
	ultimoAnioVulnerabilidadSocial,
	tieneProgramaApoyo,
	areaParaServicios,
	serviciosEstanActivos,
	municipiosTodoElPais,
}) => (dispatch) => {
	dispatch(postOrganizationPending());
	return axios
		.post('/organizaciones', {
			nombre,
			siglas,
			municipio,
			latlng,
			direccion,
			telefono,
			email,
			url,
			facebook,
			twitter,
			naturaleza,
			procesoadminsion: procesoAdminsion,
			areastrabajos: areasTrabajos,
			servicio,
			principales_problemas: principalesProblemas,
			inscrita_conna: inscritaConna,
			ultimo_anio_vulnerabilidad_social: ultimoAnioVulnerabilidadSocial,
			ultimo_anio_responabilidad_social: ultimoAnioResponabilidadSocial,
			tiene_programa_apoyo: tieneProgramaApoyo,
			area_para_servicios: areaParaServicios,
			lugares_procedencia: lugaresProcedencia,
			servicios_estan_activos: serviciosEstanActivos,
			atiende_municipios_de_todo_el_pais: municipiosTodoElPais,
		})
		.then((res) => {
			const payload = _.keyBy([res.data], 'id');
			dispatch(postOrganizationFulfilled(payload));
		})
		.catch((err) => {
			dispatch(postOrganizationRejected(err));
		});
};

export const deleteOrganization = (organizationId, nombre) => (dispatch) => axios
	.delete(`/organizaciones/${organizationId}`,
		{ params: { nombre } })
	.then((response) => {
		dispatch(deleteOrganizationFulfilled(response.data));
	})
	.catch((error) => {
		/*
      this is a fix for an strapi bug
      strapi would return an error code of 500 even though
      the deletion is successful on the database
    */
		if (error.response.status === 500) {
			dispatch(deleteOrganizationFulfilled({ id: organizationId }));
		} else {
			dispatch(deleteOrganizationRejected(error));
		}
	});
export const updateOrganization = ({
	id,
	nombre,
	siglas,
	municipio,
	latlng,
	direccion,
	telefono,
	email,
	url,
	facebook,
	twitter,
	naturaleza,
	procesoAdminsion,
	lugaresProcedencia,
	areasTrabajos,
	servicio,
	principalesProblemas,
	inscritaConna,
	ultimoAnioResponabilidadSocial,
	ultimoAnioVulnerabilidadSocial,
	tieneProgramaApoyo,
	areaParaServicios,
	serviciosEstanActivos,
	municipiosTodoElPais,
}) => (dispatch) => {
	dispatch(updateOrganizationPending());
	const putParameters = {
		nombre,
		siglas,
		municipio,
		latlng,
		direccion,
		telefono,
		email,
		url,
		facebook,
		twitter,
		naturaleza,
		procesoadminsion: procesoAdminsion,
		areastrabajos: areasTrabajos,
		servicio,
		principales_problemas: principalesProblemas,
		inscrita_conna: inscritaConna === 'true',
		ultimo_anio_vulnerabilidad_social: ultimoAnioVulnerabilidadSocial,
		ultimo_anio_responabilidad_social: ultimoAnioResponabilidadSocial,
		tiene_programa_apoyo: tieneProgramaApoyo,
		area_para_servicios: areaParaServicios,
		lugares_procedencia: lugaresProcedencia,
		servicios_estan_activos: serviciosEstanActivos,
		atiende_municipios_de_todo_el_pais: municipiosTodoElPais,
	};

	return axios
		.put(`/organizaciones/${id}`, putParameters)
		.then((res) => {
			dispatch(updateOrganizationFulfilled(res.data));
		})
		.catch((err) => {
			dispatch(updateOrganizationRejected(err));
		});
};
