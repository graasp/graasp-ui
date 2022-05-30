/**
 * The H5P API reference
 * https://h5p.org/documentation/api/H5P.html
 *
 * We only specify used members, so feel free to add properties according to the above spec
 */
export namespace H5P {
  /** Async error handling */
  type ErrorCallback = (error: unknown) => void;
  /** Callback type for event listeners */
  type EventCallback = (event: Event) => void;

  /**  The Event class for the EventDispatcher.  */
  class Event {
    constructor(
      type: string,
      data: unknown,
      extras?: { bubbles?: boolean; external?: boolean },
    );
    /**
     * Get bubbling status
     * @returns true if bubbling false otherwise
     */
    getBubbles(): boolean;
    /**
     * Prevent this event from bubbling up to parent
     */
    preventBubbling();
    /**
     * Try to schedule an event for externalDispatcher
     * @returns true if external and not already scheduled, otherwise false
     */
    scheduleForExternal(): boolean;
  }

  /** Used for xAPI events */
  class XAPIEvent extends Event {
    /** List of verbs defined at ADL xAPI Vocabulary */
    static allowedXAPIVerbs: Array<string>;
    /** Get content xAPI ID */
    getContentXAPIId(instance: H5P.Instance);
    /** Get the max value of the result - score part of the statement */
    getMaxScore(): number | null;
    /** Get the raw valu of the result - score part of the statement */
    getScore(): number | null;
    /** Get the statements verb id */
    getVerb(full: bolean): string | null;
    /** Figure out if a property exists in the statement and return it */
    getVerifiedStatementValue(keys: Array<string>): unknown | null;
    /** Check if the event is sent from a child (i.e not from grandchild) */
    isFromChild(): boolean;
    /** Set the actor. Email and name will be added automatically */
    setActor();
    /** Set the context part of the statement */
    setContext(instance: H5P.Instance);
    /** Set the object part of the statment. The id is found automatically (the url to the content) */
    setObject(instance: H5P.Instance);
    /** Set scored result statements */
    setScoredResult(
      score: number,
      maxScore: number,
      instance: H5P.Instance,
      completion: boolean,
      success: boolean,
    );
    /** Set a verb */
    setVerb(verb: string);
  }

  /** The base of the event system. Inherit this class if you want your H5P to dispatch events. */
  class EventDispatcher {
    /** Helper function to create event templates added to the EventDispatcher. Will in the future be used to add representations of the questions to the statements.  */
    createXAPIEventTemplate(verb: string, extra?: object): XAPIEvent;
    /** Remove event listener. If no listener is specified, all listeners will be removed */
    off(type: string, listener: EventCallback);
    /** Add new event listener */
    on(type: string, listener: EventCallback, thisArg?: object);
    /** Add new event listener that will be fired only once */
    once(type: string, listener: EventCallback, thisArg?: object);
    /** Dispatch event */
    trigger(
      event: string | Event,
      eventData?: unknown,
      extras?: { bubbles?: boolean; external?: boolean },
    );
    /** Helper function for triggering xAPI added to the EventDispatcher */
    triggerXAPI(verb: string, extra?: object);
    /**
     * Helper function to create xAPI completed events
     * @deprecated
     * @use triggerXAPIScored instead
     */
    triggerXAPICompleted(score: number, maxScore: number, success: boolean);
    /** Helepr function to create scored xAPI events */
    triggerXAPIScored(
      score: number,
      maxScore: number,
      verb: string,
      completion: boolean,
      success: boolean,
    );
  }

  /** The base H5P object injected into window */
  export interface Instance {
    /**  The external event dispatcher. Others, outside of H5P may register and listen for H5P Events here.  */
    externalDispatcher: EventDispatcher;
  }
}

/**
 * The H5P runtime dynamically decorates the Window global
 */
declare global {
  interface Window {
    H5P: H5P.Instance;
  }
}
