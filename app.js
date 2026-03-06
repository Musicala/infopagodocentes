'use strict';

const $ = (selector) => document.querySelector(selector);

const data = {
  rates: [
    {
      title: 'Musicala Virtual personalizado',
      value: 30000,
      note: 'Clase personalizada de 60 minutos en modalidad virtual.'
    },
    {
      title: 'Musicala Sede personalizado',
      value: 36000,
      note: 'Clase personalizada de 60 minutos en sede.'
    },
    {
      title: 'Musicala Hogar personalizado',
      value: 36000,
      note: 'Clase personalizada de 60 minutos en la ubicación del estudiante.'
    },
    {
      title: 'Musicala Sede y Hogar grupal',
      value: 44000,
      note: 'Clase grupal de 2 a 6 estudiantes.'
    }
  ],

  bonuses: [
    {
      title: 'Bonificación distancia y transporte',
      value: 10000,
      note: 'Aplica para municipios aledaños a Bogotá.'
    },
    {
      title: 'Bonificación por idioma',
      value: 10000,
      note: 'Aplica para clases realizadas en otros idiomas.'
    }
  ],

  adminReminders: [
    {
      title: 'Clase adicional',
      value: 21000,
      note: 'Pago adicional.'
    },
    {
      title: 'Clase de hogar adicional',
      value: 25000,
      note: 'Pago adicional en modalidad hogar.'
    },
    {
      title: 'Transporte',
      value: 3550,
      note: 'Valor de transporte.'
    }
  ]
};

const el = {
  ratesList: $('#ratesList'),
  bonusList: $('#bonusList'),
  adminList: $('#adminList'),
  summaryBox: $('#summaryBox')
};

function formatCurrency(value) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(value);
}

function createItem(item, extraClass = '') {
  return `
    <div class="item ${extraClass}">
      <div class="item-top">
        <div class="item-title">${escapeHtml(item.title)}</div>
        <div class="item-value">${formatCurrency(item.value)}</div>
      </div>
      <div class="item-note">${escapeHtml(item.note)}</div>
    </div>
  `;
}

function renderRates() {
  el.ratesList.innerHTML = data.rates
    .map((item) => createItem(item))
    .join('');
}

function renderBonuses() {
  el.bonusList.innerHTML = data.bonuses
    .map((item) => createItem(item, 'bonus-item'))
    .join('');
}

function renderAdmin() {
  el.adminList.innerHTML = data.adminReminders
    .map((item) => createItem(item, 'admin-item'))
    .join('');
}

function renderSummary() {
  const totalRates = data.rates.length;
  const totalBonuses = data.bonuses.length;
  const totalExtras = data.adminReminders.length;
  const highestRate = Math.max(...data.rates.map(item => item.value));
  const lowestRate = Math.min(...data.rates.map(item => item.value));

  el.summaryBox.innerHTML = `
    <span class="summary-chip">🎼 Tarifas base: <strong>${totalRates}</strong></span>
    <span class="summary-chip">✨ Bonificaciones: <strong>${totalBonuses}</strong></span>
    <span class="summary-chip">📌 Pagos adicionales: <strong>${totalExtras}</strong></span>
    <span class="summary-chip">📈 Tarifa más alta: <strong>${formatCurrency(highestRate)}</strong></span>
    <span class="summary-chip">📉 Tarifa más baja: <strong>${formatCurrency(lowestRate)}</strong></span>
  `;
}

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function init() {
  renderRates();
  renderBonuses();
  renderAdmin();
  renderSummary();
}

document.addEventListener('DOMContentLoaded', init);