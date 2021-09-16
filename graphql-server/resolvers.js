import fetch from 'node-fetch';
import { PubSub } from 'graphql-subscriptions';

const WIDGET_INSERTED = 'widgetInserted';
const WIDGET_DELETED = 'widgetDeleted';
const pubsub = new PubSub();
const widgets = [
  {
    'id': 1,
    'name': 'Widget A',
    //'description': 'eseses',
    'color': 'red',
    'size': 'small',
    'price': 10,
    'quantity': 100
  },
  {
    'id': 2,
    'name': 'Widget B',
    'description': 'Medium, Blue Widget',
    'color': 'blue',
    'size': 'medium',
    'price': 5,
    'quantity': 50
  },
  {
    'id': 3,
    'name': 'Widget C',
    'description': 'Large, Yellow Widget',
    'color': 'yellow',
    'size': 'large',
    'price': 15,
    'quantity': 75
  },
  {
    'id': 4,
    'name': 'Widget D',
    'description': 'Medium, Red Widget',
    'color': 'red',
    'size': 'medium',
    'price': 20,
    'quantity': 20
  }
];
export const resolvers = {
  Query: {
    message: () => 'Hello World!',
    widgets: () => widgets.map(widget => ({ ...widget, description: `${widget.description ? widget.description : ''}` }))
  },
  Mutation: {
    insertWidget: (_, { widget }, { restURL }) =>
      fetch(`${restURL}/widgets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(widget)
      })
        .then(res => res.json())
        .then(widget => {
          pubsub.publish(WIDGET_INSERTED, { widgetInserted: widget });
          return widget;
        }),
    replaceWidget: (_, { widget }, { restURL }) =>
      fetch(`${restURL}/widgets/${encodeURIComponent(widget.id)}`)
        .then(res => res.json())
        .then(oldWidget =>
          fetch(`${restURL}/widgets/${encodeURIComponent(widget.id)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(widget)
          })
            .then(() => oldWidget)),
    deleteWidget: (_, { widgetId }, { restURL }) =>
      fetch(`${restURL}/widgets/${encodeURIComponent(widgetId)}`)
        .then(res => res.json())
        .then(widget => {
          return fetch(`${restURL}/widgets/${encodeURIComponent(widgetId)}`, { method: 'DELETE' })
            .then(() => widget);
        })
        .then(widget => {
          pubsub.publish(WIDGET_DELETED, { widgetDeleted: widget });
          return widget;
        }),
    deleteWidgets: (_, { widgetIds }, { restURL }) =>
      Promise.all(
        widgetIds.map(widgetId =>
          fetch(`${restURL}/widgets/${encodeURIComponent(widgetId)}`)
            .then(res => res.json())
            .then(widget => {
              return fetch(`${restURL}/widgets/${encodeURIComponent(widgetId)}`, { method: 'DELETE' })
                .then(() => widget);
            })
            .then(widget => {
              pubsub.publish(WIDGET_DELETED, { widgetDeleted: widget });
              return widget;
            })
        )
      ),
  },
  Subscription: {
    widgetInserted: {
      subscribe: () => pubsub.asyncIterator(WIDGET_INSERTED),
    },
    widgetDeleted: {
      subscribe: () => pubsub.asyncIterator(WIDGET_DELETED),
    },
  },
};
