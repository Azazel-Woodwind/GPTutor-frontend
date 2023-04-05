export function defineAbortControllers(api) {
    const abortSignals = {};

    Object.keys(api).forEach(requestName => {
        const cancellationControllerObject = {
            controller: undefined,
        };

        abortSignals[requestName] = {
            handleRequestCancellation: () => {
                if (cancellationControllerObject.controller) {
                    cancellationControllerObject.controller.abort();
                }

                cancellationControllerObject.controller = new AbortController();

                // cancel the request after 5 seconds
                // setTimeout(
                //     () => cancellationControllerObject.controller.abort(),
                //     5000 || 0
                // );

                return cancellationControllerObject.controller.signal;
            },
        };
    });

    return abortSignals;
}
